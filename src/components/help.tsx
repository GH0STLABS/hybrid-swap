import { Fragment, SetStateAction, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WL_KEYS } from "@/solana/source/consts";
import CreateModal from "./create-modal";
import DepositModal from "./deposit-modal";
import { useRouter } from "next/router";

interface HelpMenuProps {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}

export default function HelpMenu({ open, setOpen }: HelpMenuProps) {
  const { publicKey } = useWallet();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [shown, setShown] = useState<boolean>(false);

  return (
    <>
      <CreateModal open={isOpen} setOpen={setIsOpen} />
      <DepositModal open={shown} setOpen={setShown} />
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="fixed z-[100]" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-[#121212]/75 backdrop-blur-md transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="relative pointer-events-auto w-screen max-w-md z-100 pb-4 mt-4 pr-4">
                    <div className="no-visible-scrollbar flex h-full flex-col overflow-y-scroll py-6 shadow-xl bg-zinc-900 rounded-xl">
                      <div className="">
                        <div className="flex items-start justify-between">
                          <div className="flex gap-2 items-center px-2">
                            <Dialog.Title className="text-lg font-bold leading-6 text-white">
                              WTF is Hybrid DeFi?
                            </Dialog.Title>
                          </div>
                        </div>
                        <div className="mt-4 px-2">
                          <label className="text-base font-light text-zinc-300">
                            To put it simply, Hybrid DeFi allows you to swap
                            between an NFT and SPL token.{" "}
                          </label>
                          <label className="mt-3 text-base text-zinc-300">
                            This allows for a few things:
                          </label>
                          <ul className="mt-1 text-base font-light text-zinc-300 flex flex-col">
                            <label className="text-base">• Built in liquidity for NFTs</label>
                            <label className="text-base">• Arbitrage opportunities</label>
                          </ul>
                          <label className="text-base font-light text-zinc-300">
                            In this case, you can select a pool tied to a pNFT collection and SPL token pNFT mint.
                            This pool will have a swap factor, which denotes how many tokens you will get.
                          </label>
                          <div className="flex gap-4 items-center mt-6">
                          {WL_KEYS.includes(publicKey?.toString() as string) ? (
                            <button
                              onClick={() => setIsOpen(true)}
                              className="flex gap-2 w-fit items-center text-lg py-1 px-2 rounded-md bg-[#FF64D8] text-white"
                            >
                              Create Pool
                            </button>
                          ) : null}
                          {(publicKey?.toString() as string) ==
                            "Fpv9hTgZEV4mDScGkdexJJHmMtBR4BECNQLYW1sijRPK" ||
                          (publicKey?.toString() as string) ==
                            "3nHNJd8mjZFTVkA2dPTSCnWjzJU3XvC5nGSrDMWNKpQb" ||
                          (publicKey?.toString() as string) ==
                            "7JcUxRFYSmy2KE5ESqewAae2STTLgU5KzyVZo657iFU5" ||
                          (publicKey?.toString() as string) ==
                            "9rdkV51HqRnfFiSYn48PTNo2DMawSJU1RVXXWKs6PReq" ? (
                            <button
                              onClick={() => setShown(true)}
                              className="flex gap-2 w-fit items-center text-lg py-1 px-2 rounded-md bg-[#FF64D8] text-white"
                            >
                              Deposit
                            </button>
                          ) : null}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
