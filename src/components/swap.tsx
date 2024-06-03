import { calcNfts } from "@/lib/calcNfts";
import { calcTokens } from "@/lib/calcTokens";
import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import WalletModal from "./wallet-modal";
import NFTModal from "./nfts-modal";
import Image from "next/image";
import { numberWithCommas } from "@/lib/numberWithCommas";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";
import { swapNFT } from "@/lib/swapNFT";
import { swapToken } from "@/lib/swapToken";
import { SwapProps } from "@/pages/swap/[id]";

export default function SwapFrame({ id, name, config, token, nft }: SwapProps) {
  const { connected, sendTransaction } = useWallet();
  const wallet = useAnchorWallet();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [amount, setAmount] = useState<number>(config.baseline);
  const [mode, setMode] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [items, setItems] = useState<any>([]);
  const [rarity, setRarity] = useState<string>("PCA");

  let nfts = calcNfts(config.baseline, token.decimals, amount);
  let tokens = calcTokens(
    config,
    items[0]?.content?.metadata.symbol as string | undefined,
    token.decimals,
    items.length
  );

  return (
    <>
      <WalletModal open={open} setOpen={setOpen} />
      <NFTModal
        mint={nft.mint}
        open={isOpen}
        setOpen={setIsOpen}
        nfts={items}
        setNFTs={setItems}
      />
      <div className="z-50 mt-32 bg-transparent flex flex-col items-center justify-center">
        <div className="flex-col space-y-4 items-center justify-center">
          {mode ? (
            <motion.div
              initial={{ opacity: 0.5, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3,
                duration: 0.8,
                ease: "easeInOut",
              }}
              className="w-[22rem] bg-zinc-900"
            >
              <div className="title-bar !bg-gradient-to-r !from-[#9945FF] !to-[#FF64D8]">
                <div className="title-bar-text pointer-events-none flex gap-1 items-center">
                  <svg
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-5 h-5"
                  >
                    {" "}
                    <path
                      d="M6 2h12v2H6V2zM4 6V4h2v2H4zm0 12V6H2v12h2zm2 2v-2H4v2h2zm12 0v2H6v-2h12zm2-2v2h-2v-2h2zm0-12h2v12h-2V6zm0 0V4h-2v2h2zm-9-1h2v2h3v2h-6v2h6v6h-3v2h-2v-2H8v-2h6v-2H8V7h3V5z"
                      fill="currentColor"
                    />{" "}
                  </svg>
                  <label>Select Token Amount</label>
                </div>
              </div>
              <div className="window-body !p-0">
                <div className="p-3">
                  <div className="flex gap-2 items-center">
                    <Image
                      src={token.image}
                      alt=""
                      width={30}
                      height={30}
                      className="rounded-full"
                    />
                    <label className="text-lg font-medium text-white">
                      {numberWithCommas(
                        calcTokens(
                          config,
                          rarity,
                          token.decimals,
                          1
                        )
                      )}
                    </label>
                    <label className="text-lg font-medium text-white">
                      {token.symbol}
                    </label>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0.5, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3,
                duration: 0.8,
                ease: "easeInOut",
              }}
              className="w-[22rem] bg-zinc-900"
            >
              <div className="title-bar !bg-gradient-to-r !from-[#9945FF] !to-[#FF64D8]">
                <div className="title-bar-text pointer-events-none flex gap-2 items-center">
                  <svg
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-5 h-5"
                  >
                    {" "}
                    <path
                      d="M24 2H4v16h20V2zM6 16V4h16v12H6zM2 4H0v18h20v-2H2V4zm12 2h2v2h-2V6zm-2 4V8h2v2h-2zm-2 2v-2h2v2h-2zm0 0v2H8v-2h2zm8-2h-2V8h2v2zm0 0h2v2h-2v-2zM8 6h2v2H8V6z"
                      fill="currentColor"
                    />{" "}
                  </svg>
                  <label>Select Your NFT</label>
                </div>
              </div>
              <div className="window-body !p-0">
                <div className="flex gap-2 items-center justify-center p-3">
                  {items.length > 0 ? (
                    <div className="flex-col justify-center w-full">
                      <div className="flex gap-2 justify-center items-center">
                        {items?.map((item: any, i: number) => (
                          <div key={i}>
                            <Image
                              src={item.content.links.image}
                              alt=""
                              width={80}
                              height={80}
                              onClick={() =>
                                setItems((prev: any) => prev.toSpliced(i, 1))
                              }
                              className="shadow-lg hover:border-2 hover:border-red-500"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setIsOpen(true)}
                      className="bg-[#FF64D8]/50 text-white"
                    >
                      Select Your NFT
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Swap Icon */}
          <motion.div
            initial={{ opacity: 0.5, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            onClick={() => (mode ? setMode(false) : setMode(true))}
            className="z-50 p-2 mx-auto w-fit hover:bg-zinc-500/50"
          >
            <svg
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-7 h-7 mx-auto z-50 text-white"
            >
              {" "}
              <path
                d="M8 20H6V8H4V6h2V4h2v2h2v2H8v12zm2-12v2h2V8h-2zM4 8v2H2V8h2zm14-4h-2v12h-2v-2h-2v2h2v2h2v2h2v-2h2v-2h2v-2h-2v2h-2V4z"
                fill="currentColor"
              />{" "}
            </svg>
          </motion.div>

          {/* User confirms or deselects */}
          {mode ? (
            <motion.div
              initial={{ opacity: 0.5, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3,
                duration: 0.8,
                ease: "easeInOut",
              }}
              className="w-[22rem] bg-zinc-900"
            >
              <div className="title-bar !bg-gradient-to-r !from-[#9945FF] !to-[#FF64D8]">
                <div className="title-bar-text pointer-events-none flex gap-2 items-center">
                  <svg
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-5 h-5"
                  >
                    {" "}
                    <path
                      d="M24 2H4v16h20V2zM6 16V4h16v12H6zM2 4H0v18h20v-2H2V4zm12 2h2v2h-2V6zm-2 4V8h2v2h-2zm-2 2v-2h2v2h-2zm0 0v2H8v-2h2zm8-2h-2V8h2v2zm0 0h2v2h-2v-2zM8 6h2v2H8V6z"
                      fill="currentColor"
                    />{" "}
                  </svg>
                  <label>To Receive</label>
                </div>
              </div>
              <div className="window-body !p-0">
                <div className="p-3">
                    <div className="flex gap-2 items-center">
                      <Image
                        src={token.image}
                        alt=""
                        width={30}
                        height={30}
                        className="rounded-full"
                      />
                      <label className="text-[#FF64D8] font-semibold text-lg">
                        1
                      </label>
                      <label className="text-lg text-white">
                        NFT{nfts > 1 && "s"}
                      </label>
                    </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0.5, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3,
                duration: 0.8,
                ease: "easeInOut",
              }}
              className="w-[22rem] bg-zinc-900"
            >
              <div className="title-bar !bg-gradient-to-r !from-[#9945FF] !to-[#FF64D8]">
                <div className="title-bar-text pointer-events-none flex gap-1 items-center">
                  <svg
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-5 h-5"
                  >
                    {" "}
                    <path
                      d="M6 2h12v2H6V2zM4 6V4h2v2H4zm0 12V6H2v12h2zm2 2v-2H4v2h2zm12 0v2H6v-2h12zm2-2v2h-2v-2h2zm0-12h2v12h-2V6zm0 0V4h-2v2h2zm-9-1h2v2h3v2h-6v2h6v6h-3v2h-2v-2H8v-2h6v-2H8V7h3V5z"
                      fill="currentColor"
                    />{" "}
                  </svg>
                  <label>To Receive</label>
                </div>
              </div>
              <div className="window-body !p-0">
                <div className="p-3">
                  <div className="flex gap-2 items-center">
                    <Image
                      src={token.image}
                      alt=""
                      width={30}
                      height={30}
                      className="rounded-full"
                    />
                    <label className="text-xl text-white">
                      {numberWithCommas(tokens)} {token.symbol}
                    </label>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          <motion.div
            initial={{ opacity: 0.5, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="mt-4 w-full"
          >
            {connected ? (
              <button
                disabled={disabled}
                onClick={async () => {
                  if (!mode) {
                    await swapNFT(wallet as NodeWallet, sendTransaction, 0, {
                      nftMint: items[0].id,
                      tokenMint: token.mint,
                      poolId: id,
                    });

                    setItems([]);
                  } else {
                    await swapToken(
                      wallet as NodeWallet,
                      sendTransaction,
                      amount,
                      setRarity,
                      {
                        tokenMint: token.mint,
                        nftMint: nft.mint,
                        poolId: id,
                      }
                    );
                  }
                }}
                className="p-2 w-full flex gap-3 items-center justify-center bg-[#FF64D8]/50 text-white text-xl"
              >
                <svg
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className={`${
                    disabled
                      ? "text-zinc-400 text-shadow-sm shadow-white"
                      : "text-white"
                  } w-6 h-6`}
                >
                  {" "}
                  <path
                    d="M12 1h2v8h8v4h-2v-2h-8V5h-2V3h2V1zM8 7V5h2v2H8zM6 9V7h2v2H6zm-2 2V9h2v2H4zm10 8v2h-2v2h-2v-8H2v-4h2v2h8v6h2zm2-2v2h-2v-2h2zm2-2v2h-2v-2h2zm0 0h2v-2h-2v2z"
                    fill="currentColor"
                  />{" "}
                </svg>
                Swap
              </button>
            ) : (
              <button
                disabled={disabled}
                onClick={() => setOpen(true)}
                className="p-2 w-full flex gap-3 items-center justify-center text-xl bg-[#FF64D8]/50 text-white"
              >
                <svg
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-6 h-6 text-white"
                >
                  {" "}
                  <path
                    d="M18 3H2v18h18v-4h2V7h-2V3h-2zm0 14v2H4V5h14v2h-8v10h8zm2-2h-8V9h8v6zm-4-4h-2v2h2v-2z"
                    fill="currentColor"
                  />{" "}
                </svg>
                Connect Wallet
              </button>
            )}
          </motion.div>
        </div>
      </div>
    </>
  );
}
