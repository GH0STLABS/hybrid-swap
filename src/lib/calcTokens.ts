export function calcTokens(nfts: number): number {
    const tokensPerNFT = 100000;
    return Math.floor(tokensPerNFT / nfts);
}