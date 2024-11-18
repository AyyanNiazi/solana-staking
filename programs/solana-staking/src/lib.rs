use anchor_lang::prelude::*;

declare_id!("BYeWgc41pqNfXnjaP9iTfc8Rv5Wo6hRyspoT1g8HqU4r");

#[program]
pub mod solana_staking {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
