import "dotenv/config";
import {
  clusterApiUrl,
  Connection,
  Transaction,
  SystemProgram,
} from "@solana/web3.js";
import { broadcast, getKeyPairs, toBaseUnit } from "./utils";
import { getAccountNativeBalance } from "./api/rpc";

main();

async function main(): Promise<void> {
  try {
    // generateNewKeyPair();
    const keypairs = getKeyPairs();
    const [user1, user2, emptyAccount] = keypairs;
    const connection = new Connection(clusterApiUrl("devnet"));
    console.log(" ------------------------------------ ");

    const tx = buildTransferTransaction();
    await broadcast(connection, tx, [user1]);
  } catch (error) {
    console.log(error);
  }
}

export async function checkAccountBalance() {
  const keypairs = getKeyPairs();
  for (const keypair of keypairs) {
    const address = keypair.publicKey.toBase58();
    // const res = await getAccountInfo(address);
    // console.log(res);
    const balance = await getAccountNativeBalance(address);
    console.log(address, " ---- ", balance.toString(10));
  }
}

export function buildTransferTransaction(): Transaction {
  try {
    const [user1, user2] = getKeyPairs();
    const tx = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: user1.publicKey,
        toPubkey: user2.publicKey,
        lamports: toBaseUnit(1).toNumber(),
      })
    );
    tx.feePayer = user1.publicKey;
    return tx;
  } catch (error) {
    console.log(error);
  }
}
