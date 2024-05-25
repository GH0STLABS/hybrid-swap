import { quackMint } from "@/solana/source/consts";

export async function getTokensByOwner(mint: string, key: string) {
    const url = process.env.NEXT_PUBLIC_HELIUS_ENDPOINT as string;
  
    const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 'my-id',
          method: 'searchAssets',
          params: {
            ownerAddress: key,
            grouping: ["collection", mint],
            page: 1,
            limit: 10
          },
        }),
      });
    const { result } = await response.json();
  
    return result;
  }