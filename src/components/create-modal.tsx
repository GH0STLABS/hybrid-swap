import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import React, { useEffect, useState } from "react";
import { useToast } from "./ui/use-toast";
import { initSponsor } from "@/solana/methods/initSponsor";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";
import { connection } from "@/solana/source/connection";

interface CreateModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CreateModal({ open, setOpen }: CreateModalProps) {
  const { toast } = useToast();
  const { sendTransaction } = useWallet();
  const wallet = useAnchorWallet();
  const [name, setName] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [nft, setNFT] = useState<string>("");
  const [fee, setFee] = useState<number>(0);
  const [baseline, setBaseline] = useState<number>(0);
  const [rare, setRare] = useState<number>(0);
  const [legend, setLegend] = useState<number>(0);

  async function create() {
    try {
      const res = await initSponsor(wallet as NodeWallet, {
        name: name,
        collectionMint: nft.trim(),
        tokenMint: token.trim(),
        lamportFee: fee,
        factors: {
          baseline,
          rare,
          legendary: legend,
        },
      });

      const signature = await sendTransaction(res.tx, connection, { skipPreflight: true });
      await connection.confirmTransaction(signature, "confirmed");

      console.log("Pool Created:", res.sponsorPDA.toString());

      toast({
        title: "Pool Created!",
        description: "Your swap pool has been successfully created.",
      });
    } catch (err) {
      throw err;
    }
  }

  return (
    <Dialog open={open}>
      <DialogContent className="window z-[150] sm:max-w-[425px] rounded-none bg-[#FDCF79] border-0">
        <DialogHeader className="title-bar">
          <div className="flex w-full px-2 justify-between items-center">
            <DialogTitle className="text-left text-white">
              <label className="text-sm">Create Swap Pool</label>
            </DialogTitle>
            <div className="title-bar-controls">
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
              ></button>
            </div>
          </div>
        </DialogHeader>
        <div className="w-full flex-col space-y-2 px-2 pb-4">
          <div className="w-full grid space-y-1">
            <label className="text-base">Name</label>
            <input
              type="text"
              defaultValue={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="w-full grid space-y-1">
            <label className="text-base">SPL Token Mint</label>
            <input
              type="text"
              defaultValue={token}
              onChange={(e) => setToken(e.target.value)}
            />
          </div>
          <div className="w-full grid space-y-1">
            <label className="text-base">pNFT Collection Mint</label>
            <input
              type="text"
              defaultValue={nft}
              onChange={(e) => setNFT(e.target.value)}
            />
          </div>
          <div className="w-full grid space-y-1">
            <label className="text-base">Fee (in Lamports)</label>
            <input
              type="number"
              defaultValue={fee}
              onChange={(e) => setFee(parseInt(e.target.value))}
            />
          </div>
          <div className="w-full grid space-y-1">
            <label className="text-base">Swap Baseline</label>
            <input
              type="number"
              defaultValue={baseline}
              onChange={(e) => setBaseline(parseInt(e.target.value))}
            />
          </div>
          <div className="w-full grid space-y-1">
            <label className="text-base">Rare Multiplier</label>
            <input
              type="number"
              defaultValue={rare}
              onChange={(e) => setRare(parseFloat(e.target.value))}
            />
          </div>
          <div className="w-full grid space-y-1">
            <label className="text-base">Legendary Multiplier</label>
            <input
              type="number"
              defaultValue={legend}
              onChange={(e) => setLegend(parseFloat(e.target.value))}
            />
          </div>
        </div>
        <button className="mb-4 mx-2 btn text-base" onClick={() => create()}>
          Submit
        </button>
      </DialogContent>
    </Dialog>
  );
}
