import SynthwaveScene from "@/components/ui/grid-animation";
import Header from "@/components/header";
import { Keypair } from "@solana/web3.js";

import { useEffect, useState } from "react";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { getProgram } from "@/solana/source/program";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";
import Link from "next/link";
import SEO from "@/components/SEO";

export default function Home() {
  const wallet = useAnchorWallet();
  const program = getProgram(wallet as NodeWallet);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchAccounts = async () => {
      if (program) {
        const accounts = await program.account.sponsor.all();
        setItems(accounts as any);
      }
    };
    fetchAccounts();
  }, []);

  return (
    <>
      <SEO
        title="Hybrid DeFi by Gh0st Labs"
        description="Swap SPL-404 Enabled tokens with the Gh0st Labs Hybrid DeFi portal."
        image="/ghostlabscover.png"
      />
      <Header />
      <main
        className={`relative flex min-h-screen flex-col items-center justify-center`}
      >
        <div className="w-full mx-auto h-screen overflow-hidden">
          <div className="mt-36 w-full flex flex-col space-y-3 justify-center items-center">
            <label className="text-6xl text-white">Explore Swap Pools</label>
            <label className="text-lg text-zinc-500">
              View hybrid swap pools across a variety of SPL tokens and pNFT
              collections
            </label>
          </div>
          {items.length > 0 ? (
            <div className="mt-12 max-w-7xl mx-auto grid grid-cols-3 gap-4">
              {items?.map((item: any, i: number) => (
                <Link
                  key={i}
                  href={`/swap/${item.publicKey.toString()}`}
                  passHref
                >
                  <div className="bg-zinc-900 p-4 flex-col hover:bg-zinc-700">
                    <label className="flex gap-1 items-center text-white text-lg font-bold">
                      {item.account.name}
                    </label>
                    <label className="flex gap-1 items-center text-white text-base">
                      {item.publicKey.toString().slice(0, 4) +
                        "..." +
                        item.publicKey.toString().slice(40, 44)}
                    </label>
                    <div className="grid grid-cols-1">
                      <label className="flex gap-1 items-center text-white font-semibold">
                        Collection:
                        <span className="font-light">
                          {item.account.nftMint.toString().slice(0, 4) +
                            "..." +
                            item.publicKey.toString().slice(40, 44)}
                        </span>
                      </label>
                      <label className="flex gap-1 items-center text-white font-semibold">
                        Token:
                        <span className="font-light">
                          {item.account.tokenMint.toString().slice(0, 4) +
                            "..." +
                            item.publicKey.toString().slice(40, 44)}
                        </span>
                      </label>
                      <label className="flex gap-1 items-center text-white font-semibold">
                        Swap Factor:
                        <span className="font-light">
                          {item.account.swapFactor[0]}
                        </span>
                      </label>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : null}
          <div className="absolute -z-50 w-full bottom-0 h-3/4">
            <SynthwaveScene />
          </div>
        </div>
      </main>
    </>
  );
}
