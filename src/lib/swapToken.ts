import { swapToNFT } from "@/solana/methods/swapToNFT";
import { connection } from "@/solana/source/connection";
import { getRandomTokenId } from "@/solana/source/utils/getRandomTokenId";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";
import React, { SetStateAction } from "react";
import { toast } from "sonner";

export async function swapToken(
  wallet: NodeWallet,
  sendTransaction: any,
  amount: number,
  setRarity: React.Dispatch<SetStateAction<string>>,
  args: {
    tokenMint: string;
    nftMint: string;
    poolId: string;
  }
) {
  try {
    let { id, info } = await getRandomTokenId(
      wallet,
      args.poolId,
      args.nftMint
    );

    setRarity(info.content.metadata.symbol);

    const tx = await swapToNFT(wallet, {
      amount: amount,
      sponsorPDA: args.poolId,
      tokenMint: args.tokenMint,
      nftMint: id,
    });

    const signature = await sendTransaction(tx, connection);
    const block = await connection.getLatestBlockhash("confirmed");
    console.log("Confirming...");
    const result = await connection.confirmTransaction(
      {
        signature,
        ...block,
      },
      "confirmed"
    );

    const error = result.value.err;
    if (error) {
      throw Error(error.toString());
    }

    console.log("Swap successful:", signature);

    const slice = info.content.metadata.symbol.slice(1, 2);

    const rarity =
      slice == "C"
        ? "Common"
        : slice == "R"
        ? "Rare"
        : slice == "L"
        ? "Legendary"
        : slice == "X"
        ? "Mythic"
        : slice == "Y"
        ? "Exotic"
        : "Unreal";

    return { signature: signature, rarity: rarity };
  } catch (err) {
    throw err;
  }
}
