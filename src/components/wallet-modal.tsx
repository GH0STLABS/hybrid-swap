import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useWallet } from "@solana/wallet-adapter-react";
import React, { useEffect } from "react";
import Image from "next/image";
import { useToast } from "./ui/use-toast";
import { IconWallet, IconX } from "@tabler/icons-react";

interface ReferralModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function WalletModal({ open, setOpen }: ReferralModalProps) {
  const { toast } = useToast();
  const { connected, select, wallets } = useWallet();

  useEffect(() => {
    if (connected) {
      setOpen(false);
    }
  }, [connected]);

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-[425px] bg-zinc-900 rounded-lg border-0 !p-0">
        <DialogHeader className="title-bar py-1 !bg-gradient-to-r !from-[#9945FF] !to-[#FF64D8] rounded-t-lg">
          <div className="flex w-full px-2 justify-between items-center">
            <div className="flex gap-1 items-center">
              <IconWallet className="w-5 h-5 text-white" />
              <DialogTitle className="text-left text-white">
                <label className="text-sm">Connect Wallet</label>
              </DialogTitle>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close">
              <IconX className="w-4 h-4 text-white" />
            </button>
          </div>
        </DialogHeader>
        {wallets.filter((wallet) => wallet.readyState === "Installed").length >
        0 ? (
          <>
            <label className="px-3 text-base text-zinc-400">
              Please connect a wallet to continue.
            </label>
            <div className="flex-col space-y-1 pb-4">
              {wallets
                .filter((wallet) => wallet.readyState === "Installed")
                .map((wallet, i) => (
                  <div key={i} className="w-full px-2">
                    <div
                      onClick={() => select(wallet.adapter.name)}
                      className="w-full flex gap-2 items-center px-2 py-2 rounded-md shadow-xl bg-zinc-800 hover:bg-zinc-700"
                    >
                      <Image
                        src={wallet.adapter.icon}
                        alt=""
                        width={50}
                        height={50}
                        className="w-8 h-8"
                      />
                      <label className="text-lg font-medium text-zinc-300">
                        {wallet.adapter.name}
                      </label>
                    </div>
                  </div>
                ))}
            </div>
          </>
        ) : (
          <div className="flex-col mx-auto py-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="mx-auto w-8 h-8"
            >
              {" "}
              <path d="M22 4v16h-6V4h6Zm-2 2h-2v12h2V6Zm-5 4v10H9V10h6Zm-2 8v-6h-2v6h2Zm-5-4v6H2v-6h6Zm-2 4v-2H4v2h2Z" />{" "}
            </svg>
            <label className="mt-3 text-lg">No wallets found :(</label>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
