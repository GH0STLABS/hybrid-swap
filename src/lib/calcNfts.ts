export function calcNfts(factor: number, decimals: number, tokens: number): number {
    return Math.floor(tokens / Math.pow(10, decimals) / factor);
}