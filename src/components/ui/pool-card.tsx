import {
  IconCoin,
  IconExternalLink,
  IconPhotoScan,
  IconSwitchHorizontal,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

interface PoolCardProps {
  pubkey: string;
  name: string;
  image: string;
  nftMint: string;
  tokenMint: string;
  factor: number;
  decimals: number;
  symbol: string;
}

export default function PoolCard({
  pubkey,
  name,
  image,
  nftMint,
  tokenMint,
  factor,
  decimals,
  symbol,
}: PoolCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0.5, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.3,
        duration: 0.8,
        ease: "easeInOut",
      }}
      className="relative bg-zinc-900 p-4 flex-col rounded-lg"
    >
      <Link
        href={`/swap/${pubkey}`}
        className="absolute top-2 right-2"
        passHref
      >
        <IconExternalLink className="w-5 h-5 text-zinc-400 hover:text-zinc-200" />
      </Link>
      <div className="bg-zinc-800 py-1.5 px-2 flex gap-2 items-center rounded-md w-fit">
        <Image
          src={image}
          alt=""
          width={25}
          height={25}
          className="rounded-full w-10 h-10"
        />
        <label className="flex gap-1 items-center text-zinc-100 text-lg font-semibold">
          {name}
        </label>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-1">
        <Link
          href={`https://solscan.io/token/${nftMint}`}
          target="_blank"
          rel="noopener noreferrer"
          passHref
        >
          <TooltipProvider>
            <Tooltip delayDuration={500}>
              <TooltipTrigger>
                <div className="flex gap-1 items-center bg-zinc-800 w-fit rounded-md px-2.5 py-1 shadow-xl">
                  <IconPhotoScan className="w-5 h-5 text-zinc-400" />
                  <label className="text-zinc-400 font-medium text-sm">
                    <span className="font-light">
                      {nftMint.slice(0, 4) + "..." + nftMint.slice(40, 44)}
                    </span>
                  </label>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <label>NFT</label>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Link>
        <Link
          href={`https://solscan.io/token/${tokenMint}`}
          target="_blank"
          rel="noopener noreferrer"
          passHref
        >
          <TooltipProvider>
            <Tooltip delayDuration={500}>
              <TooltipTrigger>
                <div className="flex gap-1 items-center bg-zinc-800 w-fit rounded-md px-2.5 py-1 shadow-xl">
                  <IconCoin className="w-5 h-5 text-zinc-400" />
                  <label className="text-zinc-400 font-medium text-sm">
                    <span className="font-light">
                      {tokenMint.slice(0, 4) + "..." + tokenMint.slice(40, 44)}
                    </span>
                  </label>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <label>Token</label>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Link>
        <TooltipProvider>
          <Tooltip delayDuration={500}>
            <TooltipTrigger>
              <div className="flex gap-1 items-center bg-zinc-800 w-fit rounded-md px-2.5 py-1 shadow-xl">
                <IconSwitchHorizontal className="w-5 h-5 text-zinc-400" />
                <label className="text-zinc-400 font-medium text-sm">
                  <span className="font-light">
                    {factor / Math.pow(10, decimals)} {symbol}
                  </span>
                </label>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <label>Base Swap Price</label>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </motion.div>
  );
}
