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
import {
  IconCoin,
  IconPhotoScan,
  IconSelect,
  IconSwitchVertical,
  IconWallet,
} from "@tabler/icons-react";
import ConnectButton from "./ui/connect-button";
import SwapButton from "./ui/swap-button";
import SuccessToast from "./ui/success-toast";
import LoadingToast from "./ui/loading-toast";
import ErrorToast from "./ui/error-toast";
import RarityToast from "./ui/rarity-toast";
import ConfettiExplosion from "react-confetti-explosion";

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
  const [explosion, setExposion] = useState<boolean>(false);

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
      <motion.div
        initial={{ opacity: 0.25, y: 0 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="z-50 bg-zinc-900 py-3 px-2 rounded-lg w-fit mx-auto flex flex-col items-center justify-center"
      >
        <div className="flex-col space-y-4 items-center justify-center">
          {mode ? (
            <div className="w-[22rem] bg-zinc-800 shadow-lg rounded-md p-1 transition-all">
              <div className="bg-zinc-700 py-1 px-2 rounded-md w-fit">
                <div className="pointer-events-none flex gap-1 items-center">
                  <IconCoin className="w-5 h-5 text-zinc-400" />
                  <label className="text-zinc-400 pointer-events-none text-sm">
                    You Pay:
                  </label>
                </div>
              </div>
              <div className="mt-2 window-body !p-0">
                <div className="p-3">
                  <div className="flex gap-2 items-center">
                    <Image
                      src={token.image}
                      alt=""
                      width={30}
                      height={30}
                      className="w-10 h-10 rounded-full"
                    />
                    <label className="text-lg text-white">
                      <strong>
                        {numberWithCommas(
                          calcTokens(config, rarity, token.decimals, 1)
                        )}
                      </strong>{" "}
                      <span>{token.symbol}</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-[22rem] bg-zinc-800 shadow-lg rounded-md p-1 transition-all">
              <div className="bg-zinc-700 py-1 px-2 rounded-md w-fit">
                <div className="title-bar-text pointer-events-none flex gap-1 items-center">
                  <IconPhotoScan className="w-5 h-5 text-zinc-400" />
                  <label className="text-zinc-400 text-sm pointer-events-none">
                    You Send:
                  </label>
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
                              className="shadow-xl rounded-md hover:border-2 hover:border-red-500"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        if (!connected) {
                          toast(
                            <ErrorToast
                              err={new Error("Please connect a wallet.")}
                            />
                          );
                          return;
                        }
                        setIsOpen(true);
                      }}
                      className="flex gap-2 items-center py-1 px-2 bg-[#FF64D8] text-white rounded-md text-sm"
                    >
                      <IconSelect className="w-4 h-4 text-white" />
                      Select Your NFT
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Swap Icon */}
          <div
            onClick={() => (mode ? setMode(false) : setMode(true))}
            className="z-50 p-2 mx-auto w-fit hover:bg-zinc-500/50 rounded-md"
          >
            <IconSwitchVertical className="w-7 h-7 mx-auto z-50 text-white" />
          </div>

          {/* User confirms or deselects */}
          {mode ? (
            <div className="w-[22rem] bg-zinc-800 shadow-lg rounded-md p-1 transition-all">
              <div className="bg-zinc-700 py-1 px-2 rounded-md w-fit">
                <div className="title-bar-text pointer-events-none flex gap-1 items-center">
                  <IconPhotoScan className="w-5 h-5 text-zinc-400" />
                  <label className="text-zinc-400 pointer-events-none text-sm">
                    You Get:
                  </label>
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
                      className="w-10 h-10 rounded-full"
                    />
                    <label className="text-lg text-white">
                      <strong className="text-[#FF64D8] text-xl">1</strong>{" "}
                      <span>NFT{nfts > 1 && "s"}</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-[22rem] bg-zinc-800 shadow-lg rounded-md p-1 transition-all">
              <div className="bg-zinc-700 py-1 px-2 rounded-md w-fit">
                <div className="title-bar-text pointer-events-none flex gap-1 items-center">
                  <IconCoin className="w-5 h-5 text-zinc-400" />
                  <label className="text-zinc-400 pointer-events-none text-sm">
                    You Get:
                  </label>
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
                      <strong>{numberWithCommas(tokens)}</strong> {token.symbol}
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="mt-4 w-full">
            {connected ? (
              <>
                <button
                  disabled={disabled}
                  onClick={async () => {
                    if (!mode) {
                      if (!items || items.length == 0) {
                        toast(
                          <ErrorToast
                            err={new Error("Please select an NFT.")}
                          />
                        );
                        return;
                      }

                      await toast.promise(
                        swapNFT(wallet as NodeWallet, sendTransaction, 0, {
                          nftMint: items[0].id,
                          tokenMint: token.mint,
                          poolId: id,
                        }),
                        {
                          loading: <LoadingToast />,
                          success: (data) => {
                            setItems([]);
                            return <SuccessToast data={data} />;
                          },
                          error: (err) => <ErrorToast err={err} />,
                        }
                      );
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
                          loading: <LoadingToast />,
                          success: (data) => {

                            data.rarity == "Legendary" 
                            ? setExposion(true)
                            : data.rarity == "Mythic"
                            ? setExposion(true) 
                            : data.rarity == "Exotic"
                            ? setExposion(true) 
                            : data.rarity == "Unreal"
                            && setExposion(true);

                            toast(<RarityToast rarity={data.rarity} />, {
                              duration: 5000,
                            });
                            return <SuccessToast data={data.signature} />;
                          },
                          error: (err) => <ErrorToast err={err} />,
                        }
                      );
                    }
                  }}
                  className="w-full"
                >
                  <SwapButton />
                </button>
              </>
            ) : (
              <ConnectButton />
            )}
            {explosion && (
              <ConfettiExplosion
                force={0.8}
                duration={3000}
                particleCount={250}
                width={1600}
                colors={[
                  "#31e4cf",
                  "#FF64D8"
                ]}
                onComplete={() => setExposion(false)}
              />
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
}
