use anchor_lang::prelude::*;

pub mod instructions;
pub mod errors;
pub mod states;
pub mod constants;

use instructions::*;

declare_id!("BYeWgc41pqNfXnjaP9iTfc8Rv5Wo6hRyspoT1g8HqU4r");

#[program]
pub mod solana_staking {
    use super::*;

    pub fn create_stake_pool(ctx: Context<CreateStakePool>, mint:Pubkey, apr:u8, min_stake_amount:u64, max_stake_amount:u64, is_flexible:bool, stake_time:u64, cool_down_time:u64) -> Result<()> {
        return create_stake_pool::create_stake_pool(ctx, mint, apr, min_stake_amount, max_stake_amount,  is_flexible, stake_time, cool_down_time);
    }
}

#[derive(Accounts)]
pub struct Initialize {}
