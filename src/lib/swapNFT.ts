import { toast } from "@/components/ui/use-toast";
import { swapToToken } from "@/solana/methods/swapToToken";
import { connection } from "@/solana/source/connection";
import { quackPoolId, quackToken } from "@/solana/source/consts";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";

export async function swapNFT(
  wallet: NodeWallet,
  sendTransaction: any,
  amount: number,
  nftMint: string
) {
  try {
    const tx = await swapToToken(wallet, {
      amount: amount,
      sponsorPDA: quackPoolId,
      tokenMint: quackToken,
      nftMint: nftMint,
    });

    const signature = await sendTransaction(tx, connection, { skipPreflight: true });
    await connection.confirmTransaction(signature, "confirmed");

    console.log("Swap successful:", signature);

    toast({
      title: "NFT Swapped!",
      description: "You've successfully swapped your NFT.",
    });
  } catch (err) {
    throw err;
  }
}
