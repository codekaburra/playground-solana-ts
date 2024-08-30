import { Connection, Keypair, Transaction } from "@solana/web3.js";
import BigNumber from "bignumber.js";
export const SOL_DECIMALS = 9;

export function toBaseUnit(amount: number | string | BigNumber) {
  return new BigNumber(amount).shiftedBy(SOL_DECIMALS);
}

export function toNormalUnit(amount: number | string | BigNumber) {
  return new BigNumber(amount).shiftedBy(-SOL_DECIMALS);
}

export function generateNewKeyPair(): Keypair {
  const keypair = Keypair.generate();
  console.log(keypair);
  console.log(keypair.publicKey.toBase58());
  return keypair;
}

export function getKeyPairs(): Keypair[] {
  return ["USER1_SECRET_KEY", "USER2_SECRET_KEY", "USER3_SECRET_KEY"].map(
    (k) => {
      const keypair = Keypair.fromSecretKey(
        Uint8Array.from(JSON.parse(process.env[k]))
      );
      // console.log(keypair);
      // console.log(keypair.publicKey.toBase58());
      return keypair;
    }
  );
}

export async function broadcast(
  connection: Connection,
  transaction: Transaction,
  signers: Keypair[]
) {
  const blockhash = await connection.getLatestBlockhash();
  console.log("blockhash: ", blockhash);
  transaction.recentBlockhash = blockhash.blockhash;
  const serizedBeforeSign: Buffer = transaction.serialize({
    requireAllSignatures: false,
    verifySignatures: false,
  });
  console.log(
    `📃 serizedBeforeSign: ${serizedBeforeSign.toString("base64url")}`
  );
  for (const signer of signers) {
    transaction.partialSign(signer);
  }
  const serializeMessage: Buffer = transaction.serialize();
  console.log(`📝 serializeMessage: ${serializeMessage.toString("base64url")}`);
  const txhash = await connection.sendRawTransaction(serializeMessage);
  console.log(`🥳 txhash: ${txhash}`);
  console.log(`🌏 https://explorer.solana.com/tx/${txhash}?cluster=devnet`);
}
