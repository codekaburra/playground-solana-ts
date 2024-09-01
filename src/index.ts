import "dotenv/config";
import {
  clusterApiUrl,
  Connection,
  Transaction,
  SystemProgram,
  TransactionInstruction,
  PublicKey,
} from "@solana/web3.js";
import {
  broadcast,
  generateNewKeyPair,
  getKeyPairs,
  toBaseUnit,
} from "./utils";
import { getAccountNativeBalance } from "./api/rpc";
import * as borsh from "@coral-xyz/borsh";

main();

async function main(): Promise<void> {
  try {
    generateNewKeyPair();
    // const keypairs = getKeyPairs();
    // const [deployer, user1, user2, emptyAccount] = keypairs;
    // const connection = new Connection(clusterApiUrl("devnet"));
    // console.log(" ------------------------------------ ");

    // const tx = buildTransferTransaction();
    // await broadcast(connection, tx, [user1]);
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

// export async function callCustomProgram() {
//   const [_, user1] = getKeyPairs();

//   const instruction = new TransactionInstruction({
//     keys: [
//       {
//         name: "initializeCounter",
//         accounts: [
//           { name: "payer", isMut: true, isSigner: true },
//           { name: "counter", isMut: true, isSigner: true },
//           { name: "systemProgram", isMut: false, isSigner: false },
//         ],
//         args: [],
//       },
//     ],
//     programId: new PublicKey(process.env.PROGRAM_ID_COUNTER),
//     data: Buffer.alloc(0),
//   });
//   const tx = new Transaction().add(instruction);
//   tx.feePayer = user1.publicKey;
//   return tx;
// }

export function buildTransferTransaction(): Transaction {
  try {
    const [_, user1, user2] = getKeyPairs();
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
