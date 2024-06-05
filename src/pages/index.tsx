import SynthwaveScene from "@/components/ui/grid-animation";
import Header from "@/components/header";
import { Keypair } from "@solana/web3.js";

import { useEffect, useState } from "react";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { getProgram } from "@/solana/source/program";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";
import Link from "next/link";
import SEO from "@/components/SEO";
import { connection } from "@/solana/source/connection";
import { Metaplex } from "@metaplex-foundation/js";
import Image from "next/image";
import PoolCard from "@/components/ui/pool-card";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { WavyBackground } from "@/components/ui/gradient-wave";

export default function Home() {
  const wallet = useAnchorWallet();
  const program = getProgram(wallet as NodeWallet);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchAccounts = async () => {
      if (program) {
        const accounts = await program.account.sponsor.all();

        const metaplex = new Metaplex(connection);

        let accs = await Promise.all(
          accounts.map(async (acc) => {
            let tokenMetadata = await metaplex
              .nfts()
              .findByMint({ mintAddress: acc.account.tokenMint });

            let tokenInfo = await connection.getParsedAccountInfo(
              acc.account.tokenMint
            );
            //@ts-ignore
            let decimals = tokenInfo?.value?.data.parsed.info.decimals;

            let uri = await fetch(tokenMetadata.uri);
            let tokenJson = await uri.json();
            return {
              publicKey: acc.publicKey,
              account: acc.account,
              tokenDecimals: decimals,
              tokenSymbol: tokenMetadata.symbol,
              tokenImage: tokenJson.image,
            };
          })
        );

        setItems(accs as any);
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
      <WavyBackground className="w-full mx-auto">
        <main
          className={`relative flex min-h-screen flex-col items-center justify-center`}
        >
          <div className="relative w-full mx-auto h-screen overflow-hidden">
            <div className="mt-36 w-full flex flex-col space-y-3 justify-center items-center">
              <label className="text-6xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 font-bold">
                Explore Swap Pools
              </label>
              <label className="text-lg text-zinc-500">
                View hybrid swap pools across a variety of SPL tokens and pNFT
                collections
              </label>
            </div>
            {items.length > 0 ? (
              <div className="mt-12 max-w-7xl mx-auto grid grid-cols-3 gap-2 max-[1200px]:grid-cols-2 max-[1200px]:px-24 max-[768px]:px-12 max-[768px]:grid-cols-1">
                {items?.map((item: any, i: number) => {
                  return (
                    <PoolCard
                      key={i}
                      pubkey={item.publicKey.toString()}
                      name={item.account.name}
                      image={item.tokenImage}
                      nftMint={item.account.nftMint.toString()}
                      tokenMint={item.account.tokenMint.toString()}
                      factor={item.account.swapFactor[0]}
                      decimals={item.tokenDecimals}
                      symbol={item.tokenSymbol}
                    />
                  );
                })}
              </div>
            ) : null}
          </div>
        </main>
      </WavyBackground>
    </>
  );
}
