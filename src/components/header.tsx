import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { useWallet } from "@solana/wallet-adapter-react";
import WalletModal from "./wallet-modal";
import HelpMenu from "./help";
import { IconDotsVertical, IconLogout, IconWallet } from "@tabler/icons-react";

export function Header() {
  const router = useRouter();
  const { connected, disconnect } = useWallet();
  const [open, setOpen] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <WalletModal open={open} setOpen={setOpen} />
      <HelpMenu open={isOpen} setOpen={setIsOpen} />
      <nav
        className={`fixed top-0 z-50 w-full flex justify-center border-b border-zinc-500/30 bg-transparent transition-all`}
      >
        <div className="w-full max-w-[1920px] grid grid-cols-3 items-center content-center px-8 py-6 h-16 max-[480px]:px-4 md:w-full max-[768px]:w-full">
          <Link href="/" className="ml-2 block">
            <div className="flex gap-2 items-end">
              <Image
                priority
                src={"/GH0STLABWORDMARKWHITE_1.png"}
                alt="quack"
                width={100}
                height={50}
                className="w-40"
              />
            </div>
          </Link>
          <div className="md:flex justify-center space-x-4 hidden text-gray-900 dark:text-white font-plex text-sm max-[768px]:w-full max-[768px]:flex"></div>
          <div className="flex gap-3 justify-end items-center">
            {connected ? (
              <button
                onClick={() => disconnect()}
                className="flex gap-2 items-center text-lg bg-[#FF64D8] rounded-md text-white py-1 px-2"
              >
                <IconLogout className="w-6 h-6 text-white" />
                Disconnect
              </button>
            ) : (
              <button
                onClick={() => setOpen(true)}
                className="flex gap-2 w-fit items-center text-lg py-1 px-2 rounded-md bg-[#FF64D8] text-white"
              >
                <IconWallet className="w-6 h-6 text-white" />
                Connect Wallet
              </button>
            )}
            <div
              onClick={() => setIsOpen(true)}
              className="p-2 w-fit hover:bg-zinc-500/50"
            >
              <IconDotsVertical className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
