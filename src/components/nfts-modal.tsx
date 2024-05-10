import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getTokensByOwner } from "@/lib/nfts/getTokensByOwner";
import { useWallet } from "@solana/wallet-adapter-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface NFTModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  nfts: any[],
  setNFTs: React.Dispatch<React.SetStateAction<any>>;
}

export default function NFTModal({ open, setOpen, nfts, setNFTs }: NFTModalProps) {
  const { publicKey, connected } = useWallet();
  const [items, setItems] = useState<any>(null);

  useEffect(() => {
    const getNFTs = async () => {
      if (connected && publicKey) {
        const result = await getTokensByOwner(publicKey.toString());

        setItems(result.items);
      }
    };
    getNFTs();
  }, [publicKey, connected]);

  return (
    <Dialog open={open}>
      <DialogContent className="window sm:max-w-[425px] rounded-none bg-[#FDCF79] border-0">
        <DialogHeader className="title-bar">
          <div className="flex w-full px-2 justify-between items-center">
            <DialogTitle className="text-left text-white">
              <label className="text-sm">My NFTs</label>
            </DialogTitle>
            <div className="title-bar-controls">
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
              ></button>
            </div>
          </div>
        </DialogHeader>
        {items != null ? (
          <div className="px-2 pb-4 grid grid-cols-3">
            {items?.map((item: any, i: number) => (
              <div key={i} onClick={() => setNFTs((prev: any) => [...prev, item])}>
                <Image
                  src={item.content.links.image}
                  alt=""
                  width={80}
                  height={80}
                  className={`shadow-lg hover:border-2 hover:border-blue-500 ${nfts.includes(item) ? "border-3 border-yellow-800" : null}`}
                />
              </div>
            ))}
          </div>
        ) : (
          <label>No NFTs found :(</label>
        )}
      </DialogContent>
    </Dialog>
  );
}
