import { CurrentLocale } from '../Translator'
import relativeFormat from '../utils/RelativeFormat'
import ExtractContent from '../utils/ExtractContent'
import { formatDecimal, parsePayoutAmount, repLog10 } from '../utils/ParsersAndFormatters'
import { vestingSteem, delegatedSteem } from '../utils/StateFunctions'
import proxifyImageUrl from '../utils/ProxifyUrl'
import * as steem from 'steem'

// function calcReputationLog10(reputation: number): number {
//     let multi = (reputation < 0)?-9:9;
//     let rep = Math.log10(Math.abs(reputation)); //The reputation score is based off of a log10 system
//     rep = Math.max(rep - 9, 0);
//     rep *= multi;
//     rep += 25;
//     return Math.floor(rep);
// }

export default class PostVM {
    readonly imageUrl?: string;
    readonly blogSizeImageUrl: string;
    readonly listSizeImageUrl: string;
    readonly description: string;
    readonly rusLetterCount: number;
    isRecentPost: boolean = false;
    isRus: boolean = false;
    isSpLow: boolean = false;
    isWhitelisted: boolean = false;
    isEligiblePost: boolean = false;

    get authorUrl(): string {
        return `/@${this.author}`;
    }

    get avatarSmall(): string {
        return `background-image: url("https://steemitimages.com/u/${this.author}/avatar/small");`;
    }

    get categoryUrl(): string {
        return `/trending/${this.category}`;
    }

    get commentsUrl(): string {
        return `${this.url}#comments`;
    }

    get reputationLog10(): number {
        return repLog10(this.reputation);
    }

    get relativeCreated(): string {
        return relativeFormat(this.created);
    }

    get payout(): string[] {
        const max_payout = parsePayoutAmount(this.max_accepted_payout);
        const pending_payout = parsePayoutAmount(this.pending_payout_value);
        const total_author_payout = parsePayoutAmount(this.total_payout_value);
        const total_curator_payout = parsePayoutAmount(this.curator_payout_value);
        let payout = pending_payout + total_author_payout + total_curator_payout;
        if (payout < 0.0) payout = 0.0;
        if (payout > max_payout) payout = max_payout;
        // Show pending payout amount for declined payment posts
        if (max_payout === 0) payout = pending_payout;

        const formattedPayout = formatDecimal(payout, 2, true);
        return formattedPayout;
    }

    get rebloggedByString(): string {
        if (this.reblogged_by && this.reblogged_by.length > 0) {
            return this.reblogged_by.join(", ");
        } else {
            return "";
        }
    }

    get rebloggedByUrl(): string {
        if (this.reblogged_by && this.reblogged_by.length > 0) {
            return `/@${this.reblogged_by[0]}`;
        } else {
            return "";
        }
    }

    get isReblogged(): boolean {
        return this.reblogged_by && this.reblogged_by.length > 0;
    } 

    get spDescription(): string {
        if (this.delegatedSteem) {
            if (this.delegatedSteem < 0) {
                return `${this.vestingSteem.toFixed(3)} STEEM` + "\n" + `(+${Math.abs(this.delegatedSteem).toFixed(3)} STEEM)`;
            }
            else {
                return `${this.vestingSteem.toFixed(3)} STEEM` + "\n" + `(-${Math.abs(this.delegatedSteem).toFixed(3)} STEEM)`;
            }
        } else {
            return `${this.vestingSteem.toFixed(3)} STEEM`;
        }
    }

    constructor(
        public readonly author: string, 
        public readonly reputation: number,
        public readonly title: string,
        public readonly permlink: string,
        public readonly url: string,
        public readonly category: string,
        public readonly body: string,
        public readonly created: Date,
        public readonly children: number,
        public readonly votes: number,
        public readonly pending_payout_value: string,
        public readonly max_accepted_payout: string,
        public readonly total_payout_value: string,
        public readonly curator_payout_value: string,
        public readonly json_metadata: string,
        public readonly reblogged_by: string[],
        public readonly vestingSteem: number,
        public readonly delegatedSteem: number,
        public readonly bowezingoVoteTime?: Date,
    ) {
        const content = ExtractContent(this.body, this.json_metadata);
        this.imageUrl = content.image_link;
        if (this.imageUrl) {
            this.blogSizeImageUrl = proxifyImageUrl(this.imageUrl, '640x480').replace(
                / /g,
                '%20'
            );
            this.listSizeImageUrl = proxifyImageUrl(
                this.imageUrl,
                '256x512'
            ).replace(/ /g, '%20');
        } else {
            this.blogSizeImageUrl = this.imageUrl;
            this.listSizeImageUrl = this.imageUrl;
        }
        this.description = content.desc;
        this.rusLetterCount = (content.post_text.toLowerCase().match(/а|б|в|г|д|е|ё|ж|з|и|й|к|л|м|н|о|п|р|с|т|у|ф|х|ц|ч|ш|щ|ъ|ы|ь|э|ю|я/g) || []).length;
    }

    static create(post: steem.Post, dynamicGlobalProperties: steem.GlobalProperties, account: steem.Account): PostVM {
        // const isRewarded = post.active_votes.some((value, index, array) => value.voter === "bowezingo");
        const bowezingoVote: steem.Vote | undefined = post.active_votes.find((value, index, array) => value.voter === "bowezingo");
        const bowezingoVoteTime: Date | undefined = bowezingoVote ? new Date(bowezingoVote.time.concat("Z")) : undefined;
        return new PostVM(
            post.author, 
            parseInt(post.author_reputation),
            post.title,
            post.permlink,
            post.url,
            post.category,
            post.body,
            new Date(post.created.concat("Z")),
            post.children,
            post.net_votes,
            post.pending_payout_value,
            post.max_accepted_payout,
            post.total_payout_value,
            post.curator_payout_value,
            post.json_metadata,
            post.reblogged_by,
            vestingSteem(account, dynamicGlobalProperties),
            delegatedSteem(account, dynamicGlobalProperties),
            bowezingoVoteTime,
        );
    }
}