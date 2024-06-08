import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import React, { useState } from "react";
import { useToast } from "./ui/use-toast";
import { PublicKey } from "@solana/web3.js";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";
import { connection } from "@/solana/source/connection";
import { deposit } from "@/solana/methods/deposit";
import { BorshAccountsCoder } from "@coral-xyz/anchor";
import { IDL } from "@/solana/idl/idl";
import { useRouter } from "next/router";
import { IconX } from "@tabler/icons-react";

interface DepositModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DepositModal({ open, setOpen }: DepositModalProps) {
  const router = useRouter();
  const { toast } = useToast();
  const { sendTransaction } = useWallet();
  const wallet = useAnchorWallet();
  const [amount, setAmount] = useState<number>(0);

  async function depositTokens() {
    try {
      if (amount <= 0)
        return toast({
          title: "Deposit",
          description: "Initial deposit must be more than 0",
        });

      let info = await connection.getAccountInfo(new PublicKey(router.query.id as string));

      let coder = new BorshAccountsCoder(IDL);
      let deser = coder.decode("sponsor", info?.data as Buffer);

      console.log("Depositing...");
      const tx = await deposit(wallet as NodeWallet, {
        amount: amount,
        sponsorPDA: router.query.id as string,
        tokenMint: deser.tokenMint.toString(),
        collectionMint: deser.nftMint.toString(),
      });

      console.log("Sending...");
      const signature = await sendTransaction(tx, connection, {
        skipPreflight: true,
      });
      await connection.confirmTransaction(signature, "confirmed");

      console.log("Deposit successful:", signature);

      toast({
        title: "Tokens Deposited!",
        description: "Your initial tokens have been deposited.",
      });
    } catch (err) {
      throw err;
    }
  }

  return (
    <Dialog open={open}>
      <DialogContent className="window z-[150] sm:max-w-[425px] rounded-none bg-zinc-900 border-0">
        <DialogHeader className="title-bar">
          <div className="flex w-full px-2 justify-between items-center">
            <DialogTitle className="text-left text-white">
              <label className="text-sm">Deposit Tokens</label>
            </DialogTitle>
            <button onClick={() => setOpen(false)} aria-label="Close">
              <IconX className="w-4 h-4 text-white" />
            </button>
          </div>
        </DialogHeader>
        <div className="w-full flex-col space-y-2 px-2 pb-4">
          <div className="w-full grid space-y-1">
            <label className="text-base text-zinc-300">Amount</label>
            <input
              type="number"
              defaultValue={amount}
              onChange={(e) => setAmount(parseInt(e.target.value))}
            />
          </div>
        </div>
        <button
          className="mb-4 mx-2 btn text-base text-white"
          onClick={() => depositTokens()}
        >
          Submit
        </button>
      </DialogContent>
    </Dialog>
  );
}
