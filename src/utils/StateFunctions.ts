import * as steem from 'steem'

export function vestingSteem(account: steem.Account, gprops: steem.GlobalProperties): number {
    const vests = parseFloat(account.vesting_shares.split(' ')[0]);
    const total_vests = parseFloat(gprops.total_vesting_shares.split(' ')[0]);
    const total_vest_steem = parseFloat(
        gprops.total_vesting_fund_steem.split(' ')[0]
    );
    const vesting_steemf = total_vest_steem * (vests / total_vests);
    return vesting_steemf;
}

// How much STEEM this account has delegated out (minus received).
export function delegatedSteem(account: steem.Account, gprops: steem.GlobalProperties): number {
    const delegated_vests = parseFloat(
        account.delegated_vesting_shares.split(' ')[0]
    );
    const received_vests = parseFloat(
        account.received_vesting_shares.split(' ')[0]
    );
    const vests = delegated_vests - received_vests;
    const total_vests = parseFloat(gprops.total_vesting_shares.split(' ')[0]);
    const total_vest_steem = parseFloat(
        gprops.total_vesting_fund_steem.split(' ')[0]
    );
    const vesting_steemf = total_vest_steem * (vests / total_vests);
    return vesting_steemf;
}
