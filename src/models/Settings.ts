
export enum PostViewer {
    Steemit = "Steemit",
    Busy = "Busy",
}

export class Settings {
    static DefaultMaxDays = 1;
    static DefaultMaxSp = 50;
    static DefaultMinRusLetters = 100;
    static DefaultWhitelist = [];
    static DefaultPostViewer = PostViewer.Steemit;

    isFilterActive_RecentPost: boolean = true;
    isFilterActive_SpLow: boolean = true;
    isFilterActive_Rus: boolean = true;
    isFilterActive_Pictures: boolean = true;
    isFilterActive_Whitelist: boolean = false;
    isFilterActive_NotRewarded: boolean = true;
    maxDays: number = Settings.DefaultMaxDays;
    maxSp: number = Settings.DefaultMaxSp;
    minRusLetters: number = Settings.DefaultMinRusLetters;
    whitelist: string[] = Settings.DefaultWhitelist;
    postViewer: PostViewer = Settings.DefaultPostViewer;
}
