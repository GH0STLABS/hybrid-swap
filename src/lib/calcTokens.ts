export function calcTokens(nfts: number): number {
    const tokensPerNFT = 100000;
    if (nfts <= 0) return 0;
    return Math.floor(tokensPerNFT / nfts);
}