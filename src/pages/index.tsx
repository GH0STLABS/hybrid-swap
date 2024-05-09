import SynthwaveScene from "@/components/ui/grid-animation";
import { Vortex } from "@/components/ui/vortex";
import Image from "next/image";
import { motion } from "framer-motion";
import WalletModal from "@/components/wallet-modal";
import { useEffect, useState } from "react";
import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import { calcNfts } from "@/lib/calcNfts";
import Header from "@/components/header";
import { getTokensByOwner } from "@/lib/nfts/getTokensByOwner";
import NFTModal from "@/components/nfts-modal";
import { calcTokens } from "@/lib/calcTokens";
import { numberWithCommas } from "@/lib/numberWithCommas";
import { swapNFT } from "@/lib/swapNFT";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";

export default function Home() {
  const { connected, sendTransaction } = useWallet();
  const wallet = useAnchorWallet();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [mode, setMode] = useState<boolean>(false);
  const [amount, setAmount] = useState<number>(0);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [items, setItems] = useState<any>([]);

  let nfts = calcNfts(amount);
  let tokens = calcTokens(items.length);

  return (
    <>
      <WalletModal open={open} setOpen={setOpen} />
      <NFTModal
        open={isOpen}
        setOpen={setIsOpen}
        nfts={items}
        setNFTs={setItems}
      />
      <Header />
      <main
        className={`relative flex min-h-screen flex-col items-center justify-center`}
      >
        <div className="w-full mx-auto h-screen overflow-hidden">
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
                  className="window w-[22rem]"
                >
                  <div className="title-bar">
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
                    <div className="bg-white p-3">
                      <div className="flex gap-2 items-center">
                        <Image
                          src="/quacklogo.jpeg"
                          alt=""
                          width={30}
                          height={30}
                        />
                        <input
                          defaultValue={amount}
                          onChange={(e) => setAmount(parseInt(e.target.value))}
                          className="text-lg pl-2 border border-zinc-500/50"
                        />
                        <label className="text-base font-medium">QUACK</label>
                      </div>
                      <label className="mt-1 pl-9 text-[9px]">
                        • 100k QUACK = 1 NFT
                      </label>
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
                  className="window w-[22rem]"
                >
                  <div className="title-bar">
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
                      <label>Select Your Quack NFTs</label>
                    </div>
                  </div>
                  <div className="window-body !p-0">
                    <div className="bg-white flex gap-2 items-center justify-center p-3">
                      {items.length > 0 ? (
                        <div className="flex-col justify-center w-full">
                          <div className="grid grid-cols-3 gap-2">
                            {items?.map((item: any, i: number) => (
                              <div key={i}>
                                <Image
                                  src={item.content.links.image}
                                  alt=""
                                  width={80}
                                  height={80}
                                  onClick={() =>
                                    setItems((prev: any) =>
                                      prev.toSpliced(i, 1)
                                    )
                                  }
                                  className="shadow-lg hover:border-2 hover:border-red-500"
                                />
                              </div>
                            ))}
                          </div>
                          <button
                            onClick={() => setIsOpen(true)}
                            className="mt-2"
                          >
                            Select Your NFTs
                          </button>
                        </div>
                      ) : (
                        <button onClick={() => setIsOpen(true)}>
                          Select Your NFTs
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
                  className="w-7 h-7 mx-auto z-50"
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
                  className="window w-[22rem]"
                >
                  <div className="title-bar">
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
                    <div className="bg-white p-3">
                      {isNaN(nfts) || nfts == 0 ? (
                        <div className="flex gap-2 items-center justify-center">
                          <Image
                            src="/duck_dancing.gif"
                            alt=""
                            width={80}
                            height={80}
                          />
                          <label className="text-lg">Insufficient QUACK</label>
                        </div>
                      ) : (
                        <div className="flex gap-2 items-center">
                          <Image
                            src="/hardhatquack.png"
                            alt=""
                            width={30}
                            height={30}
                            className="rounded-full"
                          />
                          <label className="text-green-700 font-semibold text-lg">
                            {nfts}
                          </label>
                          <label className="text-lg">
                            QUACK NFT{nfts > 1 && "s"}
                          </label>
                        </div>
                      )}
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
                  className="window w-[22rem]"
                >
                  <div className="title-bar">
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
                    <div className="bg-white p-3">
                      <div className="flex gap-2 items-center">
                        <Image
                          src="/quacklogo.jpeg"
                          alt=""
                          width={30}
                          height={30}
                        />
                        <label className="text-xl">
                          {numberWithCommas(tokens)} QUACK
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
                        console.log(items[0].id)
                        await swapNFT(
                          wallet as NodeWallet,
                          sendTransaction,
                          0,
                          items[0].id
                        )
                      }
                    }}
                    className="btn p-2 w-full flex gap-3 items-center justify-center text-xl"
                  >
                    <svg
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className={`${
                        disabled
                          ? "text-zinc-400 text-shadow-sm shadow-white"
                          : "text-black"
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
                    className="btn p-2 w-full flex gap-3 items-center justify-center text-xl"
                  >
                    <svg
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="w-6 h-6 text-black"
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
          <div className="absolute -z-50 w-full bottom-0 h-3/4">
            <SynthwaveScene />
          </div>
        </div>
      </main>
    </>
  );
}
