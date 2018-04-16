declare module 'steem' {
    export const api: Api;
    
    interface DiscussionQuery
    {
       tag?: string;
       limit?: number; // (default = 0, max = 100)
       filter_tags?: string[];
       select_authors?: string[]; ///< list of authors to include, posts not by this author are filtered
       select_tags?: string[]; ///< list of tags to include, posts without these tags are filtered
       truncate_body?: number; ///< the number of bytes of the post body to return, 0 for all (default = 0)
       start_author?: string;
       start_permlink?: string;
       parent_author?: string;
       parent_permlink?: string;
    }

    interface Vote {
        percent: number, //10000
        reputation: string, //"74378317044"
        rshares: number, //443494199
        time: string, //"2018-04-16T08:14:51"
        voter: string, //"armia"
        weight: number, //724            
    }

    interface Post {
        abs_rshares: string; //"101775123872"
        active: string; //"2018-04-03T09:28:33"
        active_votes: Vote[];
        allow_curation_rewards: boolean;
        allow_replies: boolean;
        allow_votes: boolean;
        author: string;
        author_reputation: string; //"231583666591"
        author_rewards: number
        beneficiaries: any[];
        body: string;
        body_length: number;
        cashout_time: string; //"2018-04-09T21:27:03"
        category: string;
        children: number;
        children_abs_rshares: string; //"101775123872"
        created: string; //"2018-04-02T21:27:03"
        curator_payout_value: string; //"0.000 SBD"
        depth: number;
        id: number;
        json_metadata: string;
        last_payout: string; //"1970-01-01T00:00:00"
        last_update: string; //"2018-04-03T09:01:12"
        max_accepted_payout: string; //"1000000.000 SBD"
        max_cashout_time: string; //"1969-12-31T23:59:59"
        net_rshares: string; //"101775123872"
        net_votes: number;
        parent_author: string;
        parent_permlink: string;
        pending_payout_value: string; //"0.258 SBD"
        percent_steem_dollars: number;
        permlink: string;
        promoted: string; //"0.000 SBD"
        reblogged_by: any[];
        replies: any[];
        reward_weight: number;
        root_author: string;
        root_permlink: string;
        root_title: string;
        title: string;
        total_payout_value: string; //"0.000 SBD"
        total_pending_payout_value: string; //"0.000 STEEM"
        total_vote_weight: number;
        url: string;
        vote_rshares: string; //"101775123872"
    }

    interface ShortFeedEntry {
        author: string;
        entry_id: number;
        permlink: string;
        reblog_by: string[]
        reblog_on: string; //"1970-01-01T00:00:00"
    }
    
    interface FeedEntry {
        comment: any; // Это НЕ Post, хотя и похоже
        entry_id: number;
        reblog_by: string[];
        reblog_on: string; //"2018-04-03T20:15:09"
    }

    interface ShortBlogEntry {
        blog: string;
        entry_id: number;
        reblog_on: string; //"2018-03-23T10:26:42"
    }
    
    interface BlogEntry extends ShortBlogEntry {
        comment: any; // Это НЕ Post, хотя и похоже
    }

    interface GlobalProperties {
        average_block_size: number, //14663
        confidential_sbd_supply: string, //"0.000 SBD"
        confidential_supply: string, //"0.000 STEEM"
        current_aslot: number, //21653933
        current_reserve_ratio: number, //200000000
        current_sbd_supply: string, //"11670855.200 SBD"
        current_supply: string, //"266981159.569 STEEM"
        current_witness: string, //"ausbitbank"
        head_block_id: string, //"01496c3979b82b769c2364439277e364f7121dc1"
        head_block_number: number, //21589049
        last_irreversible_block_num: number, //21589034
        max_virtual_bandwidth: string, //"264241152000000000000"
        maximum_block_size: number, //65536
        num_pow_witnesses: number, //172
        participation_count: number, //128
        pending_rewarded_vesting_shares: string, //"383027223.053349 VESTS"
        pending_rewarded_vesting_steem: string, //"186658.772 STEEM"
        recent_slots_filled: string, //"340282366920938463463374607431768211455"
        sbd_interest_rate: number, //0
        sbd_print_rate: number, //10000
        time: string, //"2018-04-15T12:56:39"
        total_pow: number, //514415
        total_reward_fund_steem: string, //"0.000 STEEM"
        total_reward_shares2: string, //"0"
        total_vesting_fund_steem: string, //"190518666.387 STEEM"
        total_vesting_shares: string, //"388305480112.074007 VESTS"
        virtual_supply: string, //"271410326.627 STEEM"
        vote_power_reserve_rate: number, //10
    }

    interface Account {
        active: any, //{weight_threshold: 1, account_auths: Array(0), key_auths: Array(1)}
        average_bandwidth: string, //"15006145465"
        average_market_bandwidth: number, //0
        balance: string, //"0.000 STEEM"
        can_vote: boolean, //true
        comment_count: number, //0
        created: string, //"2018-01-30T07:02:00"
        curation_rewards: number, //2628
        delegated_vesting_shares: string, //"0.000000 VESTS"
        guest_bloggers: any[], //[]
        id: number, //696343
        json_metadata: any, //"{"profile":{"profile_image":"http://avatars.kards.qip.ru/images/avatar/c7/a2/107207.jpg"}}"
        last_account_recovery: string, //"1970-01-01T00:00:00"
        last_account_update: string, //"2018-03-28T18:07:33"
        last_bandwidth_update: string, //"2018-04-15T12:34:09"
        last_market_bandwidth_update: string, //"1970-01-01T00:00:00"
        last_owner_update: string, //"2018-03-16T21:04:18"
        last_post: string, //"1970-01-01T00:00:00"
        last_root_post: string, //"1970-01-01T00:00:00"
        last_vote_time: string, //"2018-04-15T12:34:09"
        lifetime_bandwidth: string, //"73752000000"
        lifetime_market_bandwidth: number, //0
        lifetime_vote_count: number, //0
        market_history: any[], //[]
        memo_key: string, //"STM8jpAwzaSuw1nAXizim2c9HnZYktBQJdJyUXznP8E53rZvkYs4H"
        mined: boolean, //false
        name: string, //"bowezingo"
        next_vesting_withdrawal: string, //"1969-12-31T23:59:59"
        other_history: any[], //[]
        owner: any, //{weight_threshold: 1, account_auths: Array(0), key_auths: Array(1)}
        post_count: number, //0
        post_history: any[], //[]
        posting: any, //{weight_threshold: 1, account_auths: Array(1), key_auths: Array(1)}
        posting_rewards: number, //0
        proxied_vsf_votes: any, //(4) [0, 0, 0, 0]
        proxy: string, //""
        received_vesting_shares: string, //"2679621.992874 VESTS"
        recovery_account: string, //"steem"
        reputation: number, //0
        reset_account: string, //"null"
        reward_sbd_balance: string, //"0.000 SBD"
        reward_steem_balance: string, //"0.000 STEEM"
        reward_vesting_balance: string, //"2536.200154 VESTS"
        reward_vesting_steem: string, //"1.244 STEEM"
        savings_balance: string, //"0.000 STEEM"
        savings_sbd_balance: string, //"0.000 SBD"
        savings_sbd_last_interest_payment: string, //"1970-01-01T00:00:00"
        savings_sbd_seconds: string, //"0"
        savings_sbd_seconds_last_update: string, //"1970-01-01T00:00:00"
        savings_withdraw_requests: number, //0
        sbd_balance: string, //"0.000 SBD"
        sbd_last_interest_payment: string, //"1970-01-01T00:00:00"
        sbd_seconds: string, //"0"
        sbd_seconds_last_update: string, //"2018-04-04T16:53:45"
        tags_usage: any[], //[]
        to_withdraw: number, //0
        transfer_history: any[], //[]
        vesting_balance: string, //"0.000 STEEM"
        vesting_shares: string, //"3846.205032 VESTS"
        vesting_withdraw_rate: string, //"0.000000 VESTS"
        vote_history: any[], //[]
        voting_power: number, //9827
        withdraw_routes: number, //0
        withdrawn: number, //0
        witness_votes: any[], //[]
        witnesses_voted_for: number, //0            
    }

    interface Api {
//     {
//       "api": "database_api",
//       "method": "set_subscribe_callback",
//       "params": ["callback", "clearFilter"]
//     },
//     {
//       "api": "database_api",
//       "method": "set_pending_transaction_callback",
//       "params": ["cb"]
//     },
//     {
//       "api": "database_api",
//       "method": "set_block_applied_callback",
//       "params": ["cb"]
//     },
//     {
//       "api": "database_api",
//       "method": "cancel_all_subscriptions"
//     },
        getTrendingTagsAsync(afterTag: string, limit: number): Promise<any>;
        getTagsUsedByAuthorAsync(author: string): Promise<any>;
        getPostDiscussionsByPayoutAsync(query: DiscussionQuery): Promise<Post[]>;
        getCommentDiscussionsByPayoutAsync(query: DiscussionQuery): Promise<Post[]>;
        getDiscussionsByTrendingAsync(query: DiscussionQuery): Promise<Post[]>;
        // getDiscussionsByTrending30Async(query: DiscussionQuery): Promise<Post[]>; // !
        getDiscussionsByCreatedAsync(query: DiscussionQuery): Promise<Post[]>;
        getDiscussionsByActiveAsync(query: DiscussionQuery): Promise<Post[]>;
        getDiscussionsByCashoutAsync(query: DiscussionQuery): Promise<Post[]>;
        // getDiscussionsByPayoutAsync(query: DiscussionQuery): Promise<Post[]>; // !
        getDiscussionsByVotesAsync(query: DiscussionQuery): Promise<Post[]>;
        getDiscussionsByChildrenAsync(query: DiscussionQuery): Promise<Post[]>;
        getDiscussionsByHotAsync(query: DiscussionQuery): Promise<Post[]>;
        getDiscussionsByFeedAsync(query: DiscussionQuery): Promise<Post[]>; // {"tag":"beetlevc","limit":20,"start_author":"veta-less","start_permlink":"landscape-in-the-style-of-impressionism"}
        getDiscussionsByBlogAsync(query: DiscussionQuery): Promise<Post[]>; // {"tag":"veta-less","limit":20,"start_author":"veta-less","start_permlink":"landscape-in-the-style-of-impressionism"}
        getDiscussionsByCommentsAsync(query: DiscussionQuery): Promise<Post[]>;
        getDiscussionsByPromotedAsync(query: DiscussionQuery): Promise<Post[]>;
        getBlockHeaderAsync(blockNum: number): Promise<any>;
        getBlockAsync(blockNum: number): Promise<any>;
        getOpsInBlockAsync(blockNum: number, onlyVirtual: boolean): Promise<any>;
        getStateAsync(path: string): Promise<any>;
        // getTrendingCategoriesAsync(after: string, limit: number): Promise<any>; // !
        // getBestCategoriesAsync(after: string, limit: number): Promise<any>; // !
        // getActiveCategoriesAsync(after: string, limit: number): Promise<any>; // !
        // getRecentCategoriesAsync(after: string, limit: number): Promise<any>; // !
        getConfigAsync(): Promise<any>;
        getDynamicGlobalPropertiesAsync(): Promise<GlobalProperties>;
        getChainPropertiesAsync(): Promise<any>;
        getFeedHistoryAsync(): Promise<any>;
        getCurrentMedianHistoryPriceAsync(): Promise<any>;
        getWitnessScheduleAsync(): Promise<any>;
        getHardforkVersionAsync(): Promise<any>;
        getNextScheduledHardforkAsync(): Promise<any>;
//     {
//       "api": "account_by_key_api",
//       "method": "get_key_references",
//       "params": ["key"]
//     },
        getAccountsAsync(names: string[]): Promise<Account[]>;        
//     {
//       "api": "database_api",
//       "method": "get_account_references",
//       "params": ["accountId"]
//     },
        lookupAccountNamesAsync(accountNames: string[]): Promise<any>;
        lookupAccountsAsync(lowerBoundName: string, limit: number): Promise<any>;
        getAccountCountAsync(): Promise<any>;
        getConversionRequestsAsync(accountName: string): Promise<any>;
        getAccountHistoryAsync(account: string, from: number, limit: number): Promise<any>;
        getOwnerHistoryAsync(account: string): Promise<any>;
//     {
//       "api": "database_api",
//       "method": "get_recovery_request",
//       "params": ["account"]
//     },
//     {
//       "api": "database_api",
//       "method": "get_escrow",
//       "params": ["from", "escrowId"]
//     },
//     {
//       "api": "database_api",
//       "method": "get_withdraw_routes",
//       "params": ["account", "withdrawRouteType"]
//     },
//     {
//       "api": "database_api",
//       "method": "get_account_bandwidth",
//       "params": ["account", "bandwidthType"]
//     },
        getSavingsWithdrawFromAsync(account: string): Promise<any>;
        getSavingsWithdrawToAsync(account: string): Promise<any>;
        getOrderBookAsync(limit: number): Promise<any>;
        getOpenOrdersAsync(owner: string): Promise<any>;
        // getLiquidityQueueAsync(startAccount: string, limit: number): Promise<any>; // !
//     {
//       "api": "database_api",
//       "method": "get_transaction_hex",
//       "params": ["trx"]
//     },
//     {
//       "api": "database_api",
//       "method": "get_transaction",
//       "params": ["trxId"]
//     },
//     {
//       "api": "database_api",
//       "method": "get_required_signatures",
//       "params": ["trx", "availableKeys"]
//     },
//     {
//       "api": "database_api",
//       "method": "get_potential_signatures",
//       "params": ["trx"]
//     },
//     {
//       "api": "database_api",
//       "method": "verify_authority",
//       "params": ["trx"]
//     },
//     {
//       "api": "database_api",
//       "method": "verify_account_authority",
//       "params": ["nameOrId", "signers"]
//     },
        getActiveVotesAsync(author: string, permlink: string): Promise<any>;
        getAccountVotesAsync(voter: string): Promise<any>;
        getContentAsync(author: string, permlink: string): Promise<any>;
        getContentRepliesAsync(author: string, permlink: string): Promise<any>;
//     {
//       "api": "database_api",
//       "method": "get_discussions_by_author_before_date",
//       "params": ["author", "startPermlink", "beforeDate", "limit"]
//     },
        getRepliesByLastUpdateAsync(startAuthor: string, startPermlink: string, limit: number): Promise<Post[]>; // Вкладка Replies на сайте (при startPermlink = "")
//     {
//       "api": "database_api",
//       "method": "get_witnesses",
//       "params": ["witnessIds"]
//     },
        getWitnessByAccountAsync(accountName: string): Promise<any>;
        getWitnessesByVoteAsync(from: number, limit: number): Promise<any>;
//     {
//       "api": "database_api",
//       "method": "lookup_witness_accounts",
//       "params": ["lowerBoundName", "limit"]
//     },
        getWitnessCountAsync(): Promise<number>;
        getActiveWitnessesAsync(): Promise<string[]>;
        // getMinerQueueAsync(): Promise<any>; // !
        getRewardFundAsync(name: string): Promise<any>;
        getVestingDelegationsAsync(account: string, from: number, limit: number): Promise<any>;
//     {
//       "api": "login_api",
//       "method": "login",
//       "params": ["username", "password"]
//     },
//     {
//       "api": "login_api",
//       "method": "get_api_by_name",
//       "params": ["database_api"]
//     },
        getVersionAsync(): Promise<any>;
        getFollowersAsync(following: string, startFollower: string, followType: any, limit: number): Promise<any>;
        getFollowingAsync(follower: string, startFollowing: string, followType: any, limit: number): Promise<any>;
        getFollowCountAsync(account: string): Promise<any>;
        getFeedEntriesAsync(account: string, entryId: number, limit: number): Promise<ShortFeedEntry[]>;
        getFeedAsync(account: string, entryId: number, limit: number): Promise<FeedEntry[]>; // max limit = 500
        getBlogEntriesAsync(account: string, entryId: number, limit: number): Promise<ShortBlogEntry[]>; // Вкладка Blog на сайте (при entryId = 0). Текст постов не возвращает!
        getBlogAsync(account: string, entryId: number, limit: number): Promise<BlogEntry[]>; // Вкладка Blog на сайте (при entryId = 0). Возвращает в том числе текст постов.
        getAccountReputationsAsync(lowerBoundName: string, limit: number): Promise<any[]>;
        getRebloggedByAsync(author: string, permlink: string): Promise<any>;
        getBlogAuthorsAsync(blogAccount: string): Promise<any>;
//     {
//       "api": "network_broadcast_api",
//       "method": "broadcast_transaction",
//       "params": ["trx"]
//     },
//     {
//       "api": "network_broadcast_api",
//       "method": "broadcast_transaction_with_callback",
//       "params": ["confirmationCallback", "trx"]
//     },
//     {
//       "api": "network_broadcast_api",
//       "method": "broadcast_transaction_synchronous",
//       "params": ["trx"]
//     },
//     {
//       "api": "network_broadcast_api",
//       "method": "broadcast_block",
//       "params": ["b"]
//     },
//     {
//       "api": "network_broadcast_api",
//       "method": "set_max_block_age",
//       "params": ["maxBlockAge"]
//     },
        getTickerAsync(): Promise<any>;
        getVolumeAsync(): Promise<any>;
        getMarketOrderBookAsync(limit: number): Promise<any>; // "method": "get_order_book"
//     {
//       "api": "market_history_api",
//       "method": "get_trade_history",
//       "params": ["start", "end", "limit"]
//     },
        getRecentTradesAsync(limit: number): Promise<any>;
        // getMarketHistoryAsync(bucket_seconds: number, start: any, end: any): Promise<any>; // !
        getMarketHistoryBucketsAsync(): Promise<any>;
    }
}
