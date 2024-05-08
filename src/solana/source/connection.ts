import * as anchor from "@coral-xyz/anchor";

export const rpc = process.env.NEXT_PUBLIC_HELIUS_ENDPOINT;

export const connection = new anchor.web3.Connection(rpc as string, 'confirmed');