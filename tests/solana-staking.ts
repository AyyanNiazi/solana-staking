import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { SolanaStaking } from "../target/types/solana_staking";
import { solConfig } from "./config";
import {
  createStakePool,
  createStakePoolContext,
} from "./testData/createStakePool";
import { Connection, PublicKey, SystemProgram } from "@solana/web3.js";

describe("solana-staking", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  // const program = anchor.workspace.SolanaStaking as Program<SolanaStaking>;

  const wallet = new anchor.Wallet(solConfig.adminKeypair);
  const provider = new anchor.AnchorProvider(solConfig.connection, wallet, {});
  const program = new Program(solConfig.idl, solConfig.programId, provider);
  const getStakePDA = async () => {
    return await PublicKey.findProgramAddressSync(
      [Buffer.from(solConfig.STAKE_SEED)],
      solConfig.programId
    );
  };
  it("Stake pool created!", async () => {
    const [stakePda] = await getStakePDA();
    // Add your test here.
    const tx = await program.methods
      .createStakePool(
        solConfig.tokenAddress,
        createStakePool.apr,
        createStakePool.minStakeAmount,
        createStakePool.maxStakeAmount,
        createStakePool.isFlexible,
        createStakePool.stakeTime,
        createStakePool.coolDownTime
      )
      .accounts({
        stakeInfo: stakePda,
        authority: solConfig.adminWallet,
        systemProgram: SystemProgram.programId,
      })
      .signers([solConfig.adminKeypair])
      .rpc();
    console.log("Your transaction signature", tx);
  });
});
