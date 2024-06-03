import { quackMint, quackPoolId } from "../consts";
import * as anchor from "@coral-xyz/anchor";
import { getProgram } from "../program";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";

export async function getRandomTokenId(wallet: NodeWallet, sponsor: string, nftMint: string) {
  try {
    const program = await getProgram(wallet);
    const url = process.env.NEXT_PUBLIC_HELIUS_ENDPOINT as string;

    const [nftAuthorityPda] = anchor.web3.PublicKey.findProgramAddressSync(
        [anchor.utils.bytes.utf8.encode("nft_authority"), new anchor.web3.PublicKey(sponsor).toBuffer()],
        program.programId
      );

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: "my-id",
        method: "searchAssets",
        params: {
          ownerAddress: nftAuthorityPda.toString(),
          grouping: ["collection", nftMint],
          page: 1,
          limit: 10,
        },
      }),
    });

    const { result } = await response.json();

    if (!result || result.items.length <= 0) throw new Error("No NFTs found.");

    // Loop through result, parse for nft grouping
    let len = result.items.length;

    const randomIndex = Math.floor(Math.random() * len);

    return { id: result.items[randomIndex].id, info: result.items[randomIndex] };
  } catch (err) {
    throw err;
  }
}
