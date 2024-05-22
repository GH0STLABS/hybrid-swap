import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { useWallet } from "@solana/wallet-adapter-react";
import WalletModal from "./wallet-modal";
import HelpMenu from "./help";

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
                className="flex gap-2 items-center text-lg bg-[#9945FF]/50 text-white py-1"
              >
                <svg
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-6 h-6 text-white"
                >
                  {" "}
                  <path
                    d="M5 3h16v4h-2V5H5v14h14v-2h2v4H3V3h2zm16 8h-2V9h-2V7h-2v2h2v2H7v2h10v2h-2v2h2v-2h2v-2h2v-2z"
                    fill="currentColor"
                  />{" "}
                </svg>
                Disconnect
              </button>
            ) : (
              <button
                onClick={() => setOpen(true)}
                className="flex gap-2 items-center text-lg py-1 bg-[#9945FF]/50 text-white"
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
            <div
              onClick={() => setIsOpen(true)}
              className="p-2 w-fit hover:bg-zinc-500/50"
            >
              <svg
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-6 h-6 text-white"
              >
                {" "}
                <path
                  d="M15 1v6H9V1h6zm-2 2h-2v2h2V3zm2 6v6H9V9h6zm-2 2h-2v2h2v-2zm2 6v6H9v-6h6zm-2 2h-2v2h2v-2z"
                  fill="currentColor"
                />{" "}
              </svg>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
