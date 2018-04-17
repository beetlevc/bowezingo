import PostVM from './PostVM'
import * as steem from 'steem'
import { LocalStorageKey, PostsPerPage, BowezingoTag } from '../constants'
import { getDiscussionsByCreatedAsync, getDynamicGlobalPropertiesAsync, getAccountsAsync } from '../steemWrappers'
import { Settings } from '../models/Settings'
import { SettingsEditorVM } from './SettingsEditorVM'
import { Dictionary } from 'lodash';
//import * as debounce from 'lodash.debounce'
const debounce = require("lodash.debounce")

function topPosition(domElt: any): number {
    if (!domElt) {
        return 0;
    }
    return domElt.offsetTop + topPosition(domElt.offsetParent);
}

function parseInt(value: any, defaultValue: number, minValue: number, maxValue: number): number {
    const parsed = Number.parseInt(value);
    if (parsed) {
        if (parsed >= minValue && parsed <= maxValue)
            return parsed;
        else
            return defaultValue;
    } else {
        return defaultValue;
    }
}

function parseStringArray(value: any, defaultValue: string[]): string[] {
    if (value && Array.isArray(value) && value.length)
        return value;
    else
        return defaultValue;
}

const MsInHour: number = 60 * 60 * 1000;

export default class AppVM {
    blogmode: boolean = false;
    isSettingsPanelVisible: boolean = false;
    posts: PostVM[] = [];
    settings: Settings = new Settings();
    settingsEditor: SettingsEditorVM = new SettingsEditorVM();
    isLoading: number = 0;
    isAllLoaded: boolean = false;
    loadMoreCount: number = 0;
    isError: boolean = false;
    internalShowAllPosts: boolean = true;
    private globalProperties?: steem.GlobalProperties;
    private accounts: Map<string, steem.Account> = new Map<string, steem.Account>();

    get postCount(): number {
        return this.posts.length;
    }

    get visiblePostCount(): number {
        if (this.internalShowAllPosts)
            return this.posts.length;
        else
            return this.posts.filter(x => x.isEligiblePost).length;
    }

    constructor() {
        this.loadSettings();
        this.attachScrollListener();
        this.loadMore();
    }

    async reloadAll(): Promise<void> {
        this.globalProperties = undefined;
        this.accounts.clear();
        this.posts = [];
        this.isAllLoaded = false;
        await this.loadMore();
    }

    loadMoreIfNeeded() {
        // console.log("loadMoreIfNeeded", this.visiblePostCount, PostsPerPage)
        if (this.visiblePostCount < PostsPerPage)
            this.loadMore(PostsPerPage); // только запускаем, но не ждем завершения
    }

    async loadMore(minVisiblePosts?: number): Promise<void> {
        if (this.loadMoreCount !== 0) return;
        // console.log("Load older posts");
        if (!minVisiblePosts)
            minVisiblePosts = this.visiblePostCount + PostsPerPage;
        this.isError = false;

        this.isLoading++;
        this.loadMoreCount++;
        try {
            let sAuthor: string = "";
            let sPermlink: string = "";
            let sExclude = true;
            while (!this.isAllLoaded && minVisiblePosts > this.visiblePostCount && !(!this.internalShowAllPosts && this.settings.isFilterActive_RecentPost && this.posts.length && !this.posts[this.posts.length - 1].isRecentPost)) {
                if (this.posts.length) {
                    sAuthor = this.posts[this.posts.length - 1].author;
                    sPermlink = this.posts[this.posts.length - 1].permlink;
                    sExclude = true;
                } else {
                    sAuthor = "";
                    sPermlink = "";
                    sExclude = false;
                }
    
                let posts = await getDiscussionsByCreatedAsync(BowezingoTag, PostsPerPage, sAuthor, sPermlink);
                this.isAllLoaded = posts.length !== PostsPerPage;
                if (sExclude)
                    posts = posts.slice(1);
                if (!this.globalProperties) {
                    this.globalProperties = await getDynamicGlobalPropertiesAsync();
                }
                const loadedAccounts = Array.from(this.accounts.keys());
                const accountsToLoad = [...new Set(posts.map(x => x.author).filter(x => loadedAccounts.indexOf(x) < 0))]; // Set для устранения дубликатов
                if (accountsToLoad && accountsToLoad.length) {
                    const accounts = await getAccountsAsync(accountsToLoad);
                    for (const account of accounts) {
                        this.accounts.set(account.name, account);
                    }
                }
                const postVMs = posts.map(x => PostVM.create(x, <steem.GlobalProperties>this.globalProperties, <steem.Account>this.accounts.get(x.author)));
                this.filterPosts(postVMs);
                this.posts.push(...postVMs);
            }
        } catch (ex) {
            console.error(ex);
            this.isError = true;
        } finally {
            this.loadMoreCount--;
            this.isLoading--;
        }
    }

    filterPosts(posts: PostVM[]): void {
        for (const post of posts) {
            post.isRecentPost = (Date.now() - post.created.valueOf()) / MsInHour <= 24 * this.settings.maxDays;
            post.isSpLow = (post.vestingSteem - (post.delegatedSteem < 0 ? post.delegatedSteem : 0)) < this.settings.maxSp;
            post.isRus = post.rusLetterCount > this.settings.minRusLetters;
            post.isWhitelisted = this.settings.whitelist.indexOf(post.author) >= 0;
            post.isEligiblePost = 
                (!this.settings.isFilterActive_RecentPost || post.isRecentPost) &&
                (!this.settings.isFilterActive_SpLow || post.isSpLow) &&
                (!this.settings.isFilterActive_Rus || post.isRus) &&
                (!this.settings.isFilterActive_Pictures || post.imageUrl !== undefined) &&
                (!this.settings.isFilterActive_Whitelist || post.isWhitelisted) &&
                (!this.settings.isFilterActive_NotRewarded || post.bowezingoVoteTime === undefined);
        }
    }

    showSettingsPanel(): void {
        this.isSettingsPanelVisible = true;

        this.settingsEditor.isFilterActive_RecentPost = this.settings.isFilterActive_RecentPost;
        this.settingsEditor.isFilterActive_SpLow = this.settings.isFilterActive_SpLow;
        this.settingsEditor.isFilterActive_Rus = this.settings.isFilterActive_Rus;
        this.settingsEditor.isFilterActive_Pictures = this.settings.isFilterActive_Pictures;
        this.settingsEditor.isFilterActive_Whitelist = this.settings.isFilterActive_Whitelist;
        this.settingsEditor.isFilterActive_NotRewarded = this.settings.isFilterActive_NotRewarded;
        this.settingsEditor.maxDays = this.settings.maxDays.toString();
        this.settingsEditor.maxSp = this.settings.maxSp.toString();
        this.settingsEditor.minRusLetters = this.settings.minRusLetters.toString();
        this.settingsEditor.whitelist = this.settings.whitelist.join(", ");
        this.settingsEditor.postViewer = this.settings.postViewer;
    }

    hideSettingsPanel(): void {
        this.isSettingsPanelVisible = false;
    }

    applySettings(): void {
        this.settings.isFilterActive_RecentPost = this.settingsEditor.isFilterActive_RecentPost;
        this.settings.isFilterActive_SpLow = this.settingsEditor.isFilterActive_SpLow;
        this.settings.isFilterActive_Rus = this.settingsEditor.isFilterActive_Rus;
        this.settings.isFilterActive_Pictures = this.settingsEditor.isFilterActive_Pictures;
        this.settings.isFilterActive_Whitelist = this.settingsEditor.isFilterActive_Whitelist;
        this.settings.isFilterActive_NotRewarded = this.settingsEditor.isFilterActive_NotRewarded;
        this.settings.maxDays = parseInt(this.settingsEditor.maxDays, Settings.DefaultMaxDays, 1, 7);
        this.settings.maxSp = parseInt(this.settingsEditor.maxSp, Settings.DefaultMaxSp, 0, 1000000);
        this.settings.minRusLetters = parseInt(this.settingsEditor.minRusLetters, Settings.DefaultMinRusLetters, 0, 1000000);
        this.settings.whitelist = this.settingsEditor.whitelist ? this.settingsEditor.whitelist.split(",").map(x => x.trim()) : []
        this.settings.postViewer = this.settingsEditor.postViewer !== undefined ? this.settingsEditor.postViewer : Settings.DefaultPostViewer;

        this.saveSettings();
        this.filterPosts(this.posts);
        this.loadMoreIfNeeded();
    }

    loadSettings(): void {
        this.settings = new Settings();
        try {
            const settingsString = localStorage.getItem(LocalStorageKey);
            const settings: Settings = settingsString ? JSON.parse(settingsString) : new Settings();

            this.settings.isFilterActive_RecentPost = settings.isFilterActive_RecentPost;
            this.settings.isFilterActive_SpLow = settings.isFilterActive_SpLow;
            this.settings.isFilterActive_Rus = settings.isFilterActive_Rus;
            this.settings.isFilterActive_Pictures = settings.isFilterActive_Pictures;
            this.settings.isFilterActive_Whitelist = settings.isFilterActive_Whitelist;
            this.settings.isFilterActive_NotRewarded = settings.isFilterActive_NotRewarded;
            this.settings.maxDays = parseInt(settings.maxDays, Settings.DefaultMaxDays, 1, 7);
            this.settings.maxSp = parseInt(settings.maxSp, Settings.DefaultMaxSp, 0, 1000000);
            this.settings.minRusLetters = parseInt(settings.minRusLetters, Settings.DefaultMinRusLetters, 0, 1000000);
            this.settings.whitelist = parseStringArray(settings.whitelist, Settings.DefaultWhitelist);
            this.settings.postViewer = settings.postViewer ? settings.postViewer : Settings.DefaultPostViewer;
        } catch (ex) {
            console.log("Could not load settings.");
            console.error(ex);
        }
    }

    saveSettings(): void {
        const settingsString = JSON.stringify(this.settings);
        try {
            localStorage.setItem(LocalStorageKey, settingsString);
        } catch {
            console.error("Could not save settings.");
        }
    }

    private scrollListener = debounce(() => {
        const el = window.document.getElementById('posts_list');
        if (!el) return;
        const scrollTop =
            window.pageYOffset !== undefined
                ? window.pageYOffset
                : (
                      document.documentElement ||
                      document.body.parentNode ||
                      document.body
                  ).scrollTop;
        if (topPosition(el) + el.offsetHeight - scrollTop - window.innerHeight < 10) {
            // console.log("loadMore");
            this.loadMore();
            // const { loadMore, posts, category } = this.props;
            // if (loadMore && posts && posts.size)
            //     loadMore(posts.last(), category);
        }
        // Detect if we're in mobile mode (renders larger preview imgs)
        // const mq = window.matchMedia('screen and (max-width: 39.9375em)');
        // if (mq.matches) {
        //     this.setState({ thumbSize: 'mobile' });
        // } else {
        //     this.setState({ thumbSize: 'desktop' });
        // }
    }, 150);

    private attachScrollListener() {
        window.addEventListener('scroll', this.scrollListener, {
            capture: false,
            passive: true,
        });
        window.addEventListener('resize', this.scrollListener, {
            capture: false,
            passive: true,
        });
        this.scrollListener();
    }

    private detachScrollListener() {
        window.removeEventListener('scroll', this.scrollListener);
        window.removeEventListener('resize', this.scrollListener);
    }
}
