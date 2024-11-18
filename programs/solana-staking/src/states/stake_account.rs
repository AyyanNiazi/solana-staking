use anchor_lang::prelude::*;

#[account]
#[derive(Default)]
pub struct StakeAccount{
    pub mint: Pubkey, // the token address
    pub apr:u8, // the rate for rewards
    pub total_deposit_for_reward:u64, // the amount deposited by the admin. this is used to distribute rewards
    pub total_amount_staked:u64, // the total amount that users have deposited
    pub amount_of_users:u64, // the total number of user that have staked tokens
    pub total_distributed_reward:u64, // the amount of tokens distributed as rewards
    pub total_premature_user_unstake:u64, // the amount of users that unstaked the token before fixed time ends
    pub min_stake_amount:u64, // the minimum amount a user can stake
    pub max_stake_amount:u64, // the max amount a user can stake
    pub authority:Pubkey, // the admin who has the autority to mint tokens
    pub is_live:bool, // admin allows user to stake tokens
    pub is_flexible:bool, // can the users stake or unstake any time
    pub stake_time:u64, // the amount of time the token needs to be staked if the stake pool is not flexible
    pub cool_down_time:u64 // if this time is greater than the current time than staking is disabled. if it is zero than staking is enabled.
}