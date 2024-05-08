import * as anchor from "@coral-xyz/anchor";

export const rpc = `https://rpc.ironforge.network/${process.env.NEXT_PUBLIC_SOLANA_ENVIRONMENT}?apiKey=${process.env.NEXT_PUBLIC_IRONFORGE_API_KEY}`;

export const connection = new anchor.web3.Connection(rpc, 'confirmed');