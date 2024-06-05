import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getTokensByOwner } from "@/lib/nfts/getTokensByOwner";
import { useWallet } from "@solana/wallet-adapter-react";
import { IconPhotoScan, IconX } from "@tabler/icons-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface NFTModalProps {
  mint: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  nfts: any[];
  setNFTs: React.Dispatch<React.SetStateAction<any>>;
}

export default function NFTModal({
  mint,
  open,
  setOpen,
  nfts,
  setNFTs,
}: NFTModalProps) {
  const { publicKey, connected } = useWallet();
  const [items, setItems] = useState<any>(null);

  useEffect(() => {
    const getNFTs = async () => {
      if (connected && publicKey) {
        const result = await getTokensByOwner(mint, publicKey.toString());

        setItems(result.items);
      }
    };
    getNFTs();
  }, [publicKey, connected]);

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-[425px] bg-zinc-900 rounded-lg border-0 !p-0">
        <DialogHeader className="title-bar py-1 !bg-gradient-to-r !from-[#9945FF] !to-[#FF64D8] rounded-t-lg">
          <div className="flex w-full px-2 justify-between items-center">
            <div className="flex gap-1 items-center">
              <IconPhotoScan className="w-5 h-5 text-white" />
              <DialogTitle className="text-left text-white">
                <label className="text-sm">My NFTs</label>
              </DialogTitle>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close">
              <IconX className="w-4 h-4 text-white" />
            </button>
          </div>
        </DialogHeader>
        {items != null ? (
          <div className="px-2 pb-4 mx-auto grid grid-cols-4 gap-4">
            {items?.map((item: any, i: number) => (
              <div
                key={i}
                onClick={() => {
                  setNFTs((prev: any) => [...prev, item]);
                  setOpen(false);
                }}
              >
                <Image
                  src={item.content.links.image}
                  alt=""
                  width={80}
                  height={80}
                  className={`rounded-md shadow-xl hover:border-2 hover:border-blue-500 ${
                    nfts.includes(item) ? "border-3 border-yellow-800" : null
                  }`}
                />
              </div>
            ))}
          </div>
        ) : (
          <label className="text-lg text-white">No NFTs found</label>
        )}
      </DialogContent>
    </Dialog>
  );
}
