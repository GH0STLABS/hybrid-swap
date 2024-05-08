import {
    createSignerFromKeypair,
    signerIdentity,
  } from "@metaplex-foundation/umi";
  import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
  import { mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";
  
  export function initUmi(rpc: string, wallet: NodeWallet) {
    try {
      const umi = createUmi(rpc).use(mplTokenMetadata());
  
      return umi;
    } catch (err) {
      throw err;
    }
  }
  