export async function getTokensByOwner(key: string) {
    const url = process.env.NEXT_PUBLIC_HELIUS_ENDPOINT as string;
  
    let quackMint = "FGHHVjzQe8m3PFcuzmmooDifbXuS16EP3EpEgWaWF5AN";
  
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
            grouping: ["collection", quackMint],
            page: 1,
            limit: 10
          },
        }),
      });
    const { result } = await response.json();
  
    return result;
  }