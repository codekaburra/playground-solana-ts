import { Keypair } from "@solana/web3.js";

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
