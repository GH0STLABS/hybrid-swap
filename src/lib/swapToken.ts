import { toast } from "@/components/ui/use-toast";
import { swapToNFT } from "@/solana/methods/swapToNFT";
import { connection } from "@/solana/source/connection";
import { getRandomTokenId } from "@/solana/source/utils/getRandomTokenId";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";

export async function swapToken(
  wallet: NodeWallet,
  sendTransaction: any,
  amount: number,
  args: {
    tokenMint: string,
    nftMint: string,
    poolId: string
  }
) {
  try {
    let randomId = await getRandomTokenId(wallet, args.poolId, args.nftMint);

    const tx = await swapToNFT(wallet, {
      amount: amount,
      sponsorPDA: args.poolId,
      tokenMint: args.tokenMint,
      nftMint: randomId,
    });

    const signature = await sendTransaction(tx, connection, { skipPreflight: true });
    await connection.confirmTransaction(signature, "confirmed");

    console.log("Swap successful:", signature);

    toast({
      title: "Tokens Swapped!",
      description: "You've successfully swapped your tokens.",
    });
  } catch (err) {
    throw err;
  }
}
