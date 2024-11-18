use anchor_lang::prelude::*;

use crate::states::StakeAccount;
use crate::constants::STAKE_SEED;

pub fn create_stake_pool<'info>(ctx:Context<CreateStakePool>, mint:Pubkey, apr:u8, min_stake_amount:u64, max_stake_amount:u64, is_flexible:bool, stake_time:u64, cool_down_time:u64) -> Result<()>{
    let stake_info = &mut ctx.accounts.stake_info;
    let authority = &ctx.accounts.authority;

    stake_info.mint = mint;
    stake_info.apr = apr;
    stake_info.total_deposit_for_reward = 0;
    stake_info.total_amount_staked = 0;
    stake_info.amount_of_users = 0;
    stake_info.total_distributed_reward = 0;
    stake_info.total_premature_user_unstake = 0;
    stake_info.min_stake_amount = min_stake_amount;
    stake_info.max_stake_amount = max_stake_amount;
    stake_info.authority = authority.key();
    stake_info.is_live = true;
    stake_info.is_flexible = is_flexible;
    stake_info.stake_time = stake_time;
    stake_info.cool_down_time = cool_down_time;

    msg!("stake pool created");

    Ok(())
}


#[derive(Accounts)]
pub struct CreateStakePool<'info>{
    #[account(
        init,
        seeds = [STAKE_SEED],
        bump,
        payer = authority,
        space = 8 + std::mem::size_of::<StakeAccount>(),
    )]
    pub stake_info: Box<Account<'info, StakeAccount>>,
    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,

}