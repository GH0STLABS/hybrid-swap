export function calcTokens(
  config: {
    baseline: number;
    rare: number;
    legend: number;
  },
  symbol: string | undefined,
  decimals: number,
  nfts: number
): number {
  if (nfts <= 0) return 0;
  if (!symbol) return 0;

  const secondLetter = symbol.slice(1, 2);
  return Math.floor(
    secondLetter == "L"
      ? (config.baseline * config.legend) / Math.pow(10, decimals)
      : secondLetter == "R"
      ? (config.baseline * config.rare) / Math.pow(10, decimals)
      : secondLetter == "X" 
      ? ((config.baseline * config.legend) * 1.1) / Math.pow(10, decimals)
      : secondLetter == "Y" 
      ? ((config.baseline * config.legend) * 1.15) / Math.pow(10, decimals)
      : secondLetter == "Z" 
      ? ((config.baseline * config.legend) * 1.2) / Math.pow(10, decimals)
      : config.baseline / Math.pow(10, decimals) / nfts
  );
}
