import "dotenv/config";
import {
  clusterApiUrl,
  Connection,
  Transaction,
  SystemProgram,
} from "@solana/web3.js";
import { getKeyPairs } from "./utils";
import { BigNumber } from "bignumber.js";
import { SOL_DECIMALS } from "./const";

main();

async function main(): Promise<void> {
  try {
    console.log("--- Starting ---");
    // generateNewKeyPair();
    const keypairs = getKeyPairs();
    const [user1, user2, emptyAccount] = keypairs;
    const connection = new Connection(clusterApiUrl("devnet"));

    // for (const keypair of keypairs) {
    //   const address = keypair.publicKey.toBase58();
    //   console.log("---- ", address);
    //   const res = await getAccountInfo(address);
    //   console.log(res);
    //   const balance = await getAccountNativeBalance(address);
    //   console.log(balance);
    // }
    console.log(" ------------------------------------ ");

    const tx = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: user1.publicKey,
        toPubkey: user2.publicKey,
        lamports: new BigNumber(1).shiftedBy(SOL_DECIMALS).toNumber(),
      })
    );
    tx.feePayer = user1.publicKey;
    const blockhash = await connection.getLatestBlockhash();
    console.log("blockhash: ", blockhash);
    tx.recentBlockhash = blockhash.blockhash;
    const serizedBeforeSign: Buffer = tx.serialize({
      requireAllSignatures: false,
      verifySignatures: false,
    });
    console.log(
      `📃 serizedBeforeSign: ${serizedBeforeSign.toString("base64url")}`
    );

    tx.partialSign(user1);
    const serializeMessage: Buffer = tx.serialize();
    console.log(`📝 serializeMessage: ${serializeMessage.toString("base64url")}`);
    const txhash = await connection.sendRawTransaction(serializeMessage);
    console.log(`🥳 txhash: ${txhash}`);
    console.log(`🌏 https://explorer.solana.com/tx/${txhash}?cluster=devnet`);
  } catch (error) {
    console.log(error);
  }
}
