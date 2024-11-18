import { PublicKey, SystemProgram } from "@solana/web3.js";
import { solConfig } from "../config";
import * as anchor from "@coral-xyz/anchor";

const getStakePDA = async () => {
  const stakePda = await PublicKey.findProgramAddressSync(
    [Buffer.from(solConfig.STAKE_SEED)],
    solConfig.programId
  );
  console.log(stakePda[0].toBase58());
  return stakePda;
};

let stake_info: PublicKey;
getStakePDA().then((res) => {
  stake_info = res[0];
});

export const createStakePool = {
  mint: solConfig.tokenAddress,
  apr: new anchor.BN(100),
  minStakeAmount: new anchor.BN(10),
  maxStakeAmount: new anchor.BN(100000),
  isFlexible: true,
  stakeTime: new anchor.BN(86400),
  coolDownTime: new anchor.BN(60),
};
export const createStakePoolContext = {
  stakeInfo: getStakePDA().then((res) => {
    // stake_info = res[0];
    return res[0];
  }),
  authority: solConfig.adminWallet,
  systemProgram: SystemProgram.programId,
};
