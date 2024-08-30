import BigNumber from "bignumber.js";
import { post } from "./superagent";

export const solanaDevnetRPC = process.env.SOLANA_DEVNET_RPC_HTTP;

export async function getAccountInfo(address: string) {
  const res = await rpcPost("getAccountInfo", [
    address,
    {
      encoding: "base58",
    },
  ]);
  return res.value;
}

export async function getAccountNativeBalance(address: string) {
  const accountInfo = await getAccountInfo(address);
  if (!accountInfo) return new BigNumber(0);
  return new BigNumber(accountInfo.lamports).shiftedBy(9);
}

export async function rpcPost(method: string, params: unknown) {
  try {
    const res = await post(solanaDevnetRPC, {
      jsonrpc: "2.0",
      id: 1,
      method,
      params,
    });
    return res.body.result;
  } catch (err) {
    console.error(err);
  }
}
