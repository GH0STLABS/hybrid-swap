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
import { toast } from "sonner";
import Link from "next/link";
import { CheckIcon, StopIcon } from "@radix-ui/react-icons";

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
                        calcTokens(config, rarity, token.decimals, 1)
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
                    await toast.promise(
                      swapNFT(wallet as NodeWallet, sendTransaction, 0, {
                        nftMint: items[0].id,
                        tokenMint: token.mint,
                        poolId: id,
                      }),
                      {
                        loading: (
                          <div className="flex gap-2 items-center">
                            <svg
                              aria-hidden="true"
                              className="inline w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-zinc-400 fill-zinc-400 dark:fill-gray-300"
                              viewBox="0 0 100 101"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                              />
                              <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                              />
                            </svg>
                            <label className="text-lg">Loading...</label>
                          </div>
                        ),
                        success: (data) => {
                          return (
                            <div className="flex gap-2 items-center justify-between">
                              <div className="flex gap-2 items-center">
                                <svg
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  className="w-5 h-5 text-green-500"
                                >
                                  {" "}
                                  <path
                                    d="M15 6h2v2h-2V6zm-2 4V8h2v2h-2zm-2 2v-2h2v2h-2zm-2 2v-2h2v2H9zm-2 2v-2h2v2H7zm-2 0h2v2H5v-2zm-2-2h2v2H3v-2zm0 0H1v-2h2v2zm8 2h2v2h-2v-2zm4-2v2h-2v-2h2zm2-2v2h-2v-2h2zm2-2v2h-2v-2h2zm2-2h-2v2h2V8zm0 0h2V6h-2v2z"
                                    fill="currentColor"
                                  />{" "}
                                </svg>
                                <label className="text-lg">
                                  Successfully Swapped!
                                </label>
                              </div>
                              <Link
                                href={`https://solscan.io/tx/${data}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                passHref
                              >
                                <button className="bg-[#9945FF]/50 text-white">
                                  View
                                </button>
                              </Link>
                            </div>
                          );
                        },
                        error: (err) => (
                          <div className="flex gap-2 items-center">
                            <svg
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              className="w-5 h-5 text-red-500"
                            >
                              {" "}
                              <path
                                d="M6 4h14v2h2v6h-8v2h6v2h-4v2h-2v2H2V8h2V6h2V4zm2 6h2V8H8v2z"
                                fill="currentColor"
                              />{" "}
                            </svg>
                            <label className="text-sm">{err.toString()}</label>
                          </div>
                        ),
                      }
                    );

                    setItems([]);
                  } else {
                    await toast.promise(
                      swapToken(
                        wallet as NodeWallet,
                        sendTransaction,
                        amount,
                        setRarity,
                        {
                          tokenMint: token.mint,
                          nftMint: nft.mint,
                          poolId: id,
                        }
                      ),
                      {
                        loading: (
                          <div className="flex gap-2 items-center">
                            <svg
                              aria-hidden="true"
                              className="inline w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-zinc-400 fill-zinc-400 dark:fill-gray-300"
                              viewBox="0 0 100 101"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                              />
                              <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                              />
                            </svg>
                            <label className="text-lg">Loading...</label>
                          </div>
                        ),
                        success: (data) => {
                          toast(
                            <div className="flex gap-2 items-center">
                              <svg
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                className="w-5 h-5 text-yellow-500"
                              >
                                {" "}
                                <path
                                  d="M16 3H6v2H2v10h6V5h8v10h6V5h-4V3h-2zm4 4v6h-2V7h2zM6 13H4V7h2v6zm12 2H6v2h12v-2zm-7 2h2v2h3v2H8v-2h3v-2z"
                                  fill="currentColor"
                                />{" "}
                              </svg>
                              <label className="text-lg">
                                You pulled a {data.rarity}!
                              </label>
                            </div>,
                            {
                              duration: 5000,
                            }
                          );
                          return (
                            <div className="flex gap-2 items-center justify-between">
                              <div className="flex gap-2 items-center">
                                <svg
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  className="w-5 h-5 text-green-500"
                                >
                                  {" "}
                                  <path
                                    d="M15 6h2v2h-2V6zm-2 4V8h2v2h-2zm-2 2v-2h2v2h-2zm-2 2v-2h2v2H9zm-2 2v-2h2v2H7zm-2 0h2v2H5v-2zm-2-2h2v2H3v-2zm0 0H1v-2h2v2zm8 2h2v2h-2v-2zm4-2v2h-2v-2h2zm2-2v2h-2v-2h2zm2-2v2h-2v-2h2zm2-2h-2v2h2V8zm0 0h2V6h-2v2z"
                                    fill="currentColor"
                                  />{" "}
                                </svg>
                                <label className="text-lg">
                                  Successfully Swapped!
                                </label>
                              </div>
                              <Link
                                href={`https://solscan.io/tx/${data.signature}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                passHref
                              >
                                <button className="bg-[#9945FF]/50 text-white">
                                  View
                                </button>
                              </Link>
                            </div>
                          );
                        },
                        error: (err) => (
                          <div className="flex gap-2 items-center">
                            <svg
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              className="w-5 h-5 text-red-500"
                            >
                              {" "}
                              <path
                                d="M6 4h14v2h2v6h-8v2h6v2h-4v2h-2v2H2V8h2V6h2V4zm2 6h2V8H8v2z"
                                fill="currentColor"
                              />{" "}
                            </svg>
                            <label className="text-sm">{err.toString()}</label>
                          </div>
                        ),
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
