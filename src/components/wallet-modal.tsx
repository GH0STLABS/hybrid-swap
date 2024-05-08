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
      <DialogContent className="window sm:max-w-[425px] rounded-none bg-[#FDCF79] border-0">
        <DialogHeader className="title-bar">
          <div className="flex w-full px-2 justify-between items-center">
            <DialogTitle className="text-left text-white">
              <label className="text-sm">Connect Wallet</label>
            </DialogTitle>
            <div className="title-bar-controls">
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
              ></button>
            </div>
          </div>
        </DialogHeader>
        {wallets.filter((wallet) => wallet.readyState === "Installed").length >
        0 ? (
          <>
            <label className="px-3 text-lg">
              Please connect a wallet to continue.
            </label>
            <div className="flex-col space-y-1 pb-4">
              {wallets
                .filter((wallet) => wallet.readyState === "Installed")
                .map((wallet, i) => (
                  <div key={i} className="w-full px-2">
                    <button
                      onClick={() => select(wallet.adapter.name)}
                      className="btn w-full flex gap-2 items-center px-2 py-2"
                    >
                      <Image
                        src={wallet.adapter.icon}
                        alt=""
                        width={50}
                        height={50}
                        className="w-8 h-8"
                      />
                      <label className="text-lg font-medium">
                        {wallet.adapter.name}
                      </label>
                    </button>
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
