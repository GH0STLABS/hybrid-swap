import * as anchor from "@coral-xyz/anchor";
import { getProvider } from "./provider";
import { PublicKey } from "@solana/web3.js";
import { IDL, Tritium } from "../idl/idl";

export const getProgram = (wallet: anchor.Wallet) => {
  const provider = getProvider(wallet);

  const idl = IDL as anchor.Idl;
  const program = new anchor.Program(
    idl,
    new PublicKey("AoFwcQnifpNDKrZeaTCDBNuvciXq5parfUJuhvojd5x7"),
    provider
  ) as unknown as anchor.Program<Tritium>;

  return program;
};