import * as anchor from "@coral-xyz/anchor";
import { clusterApiUrl, Connection, Keypair } from "@solana/web3.js";
import solana_staking from "../target/idl/solana_staking.json";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";
import { bs58 } from "@coral-xyz/anchor/dist/cjs/utils/bytes";
const programId = new anchor.web3.PublicKey(
  "BYeWgc41pqNfXnjaP9iTfc8Rv5Wo6hRyspoT1g8HqU4r"
);

const privateKey = process.env.PRIVATE_KEY;
const testWallet = Keypair.fromSecretKey(bs58.decode(privateKey));

const wallet = NodeWallet.local();
const connection = new Connection(clusterApiUrl("testnet"), "confirmed");
const provider = new anchor.AnchorProvider(connection, wallet, {
  commitment: "confirmed",
});

export const solConfig = {
  programId: programId,
  connection: connection,
  provoder: provider,
  tokenAddress: new anchor.web3.PublicKey(
    "HkE7tyLsiDyUeQpswvBqZeuQkqZSa3sj8JNi4n4Q62eK"
  ),
  STAKE_SEED: "STAKE_SEED",
  idl: solana_staking,
  adminWallet: testWallet.publicKey,
  adminKeypair: testWallet,
};
