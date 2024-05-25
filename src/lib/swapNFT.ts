import { toast } from "@/components/ui/use-toast";
import { swapToToken } from "@/solana/methods/swapToToken";
import { connection } from "@/solana/source/connection";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";

export async function swapNFT(
  wallet: NodeWallet,
  sendTransaction: any,
  amount: number,
  args: {
    nftMint: string,
    tokenMint: string,
    poolId: string
  }
) {
  try {
    const tx = await swapToToken(wallet, {
      amount: amount,
      sponsorPDA: args.poolId,
      tokenMint: args.tokenMint,
      nftMint: args.nftMint,
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
