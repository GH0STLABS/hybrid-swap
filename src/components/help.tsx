import { Fragment, SetStateAction, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WL_KEYS } from "@/solana/source/consts";
import CreateModal from "./create-modal";

interface HelpMenuProps {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}

export default function HelpMenu({ open, setOpen }: HelpMenuProps) {
  const { publicKey } = useWallet();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
    <CreateModal open={isOpen} setOpen={setIsOpen} />
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
                <Dialog.Panel className="relative pointer-events-auto w-screen max-w-md z-100">
                  <div className="window no-visible-scrollbar flex h-full flex-col overflow-y-scroll py-6 shadow-xl">
                    <div className="">
                      <div className="title-bar flex items-start justify-between">
                        <div className="title-bar-text px-2">
                          <Dialog.Title className="text-base font-semibold leading-6 text-white">
                            WTF is Hybrid DeFi?
                          </Dialog.Title>
                        </div>
                      </div>
                      <div className="mt-4 px-2">
                        <label className="text-base">
                          To put it simply, Hybrid DeFi allows you to swap
                          between an NFT and SPL token.
                        </label>
                        <label className="mt-3 text-base font-semibold">
                          This allows for a few things:
                        </label>
                        <ul className="mt-1 text-base">
                          <li>• Built in liquidity for NFTs</li>
                          <li>• Arbitrage opportunities</li>
                        </ul>
                        <label className="mt-3 text-base">
                          In the case of Quack Capital, you can swap your Quack
                          NFT for 100k QUACK tokens, or the same in the reverse.
                          This makes the NFT you bought at mint 1:1 backed
                          initially.
                        </label>
                        {WL_KEYS.includes(publicKey?.toString() as string) ? (
                          <button onClick={() => setIsOpen(true)} className="mt-4 btn">Create Pool</button>
                        ) : null}
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
