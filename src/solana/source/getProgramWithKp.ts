import * as anchor from "@coral-xyz/anchor";
import { getProvider } from "./provider";
import { Keypair, PublicKey } from "@solana/web3.js";
import { IDL, Tritium } from "../idl/idl";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";

export const getProgramWithKeypair = (keypair: Keypair) => {
  const provider = getProvider(new anchor.Wallet(keypair));

  const idl = IDL as anchor.Idl;
  const program = new anchor.Program(
    idl,
    new PublicKey("FRU8neyAizvVGrB5Z2YgYZBoG76wtYT94GXWsg7Tb4Ns"),
    provider
  ) as unknown as anchor.Program<Tritium>;

  return program;
};