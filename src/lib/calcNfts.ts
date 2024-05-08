export function calcNfts(tokens: number): number {
    const tokensPerNFT = 100000;
    return Math.floor(tokens / tokensPerNFT);
}