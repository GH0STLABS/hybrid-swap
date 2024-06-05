import SynthwaveScene from "@/components/ui/grid-animation";
import Header from "@/components/header";
import SwapFrame from "@/components/swap";
import { GetServerSideProps } from "next";
import { connection } from "@/solana/source/connection";
import { PublicKey } from "@solana/web3.js";
import { BorshAccountsCoder } from "@coral-xyz/anchor";
import { IDL } from "@/solana/idl/idl";
import { Metaplex } from "@metaplex-foundation/js";
import SEO from "@/components/SEO";
import { WavyBackground } from "@/components/ui/gradient-wave";

export interface SwapProps {
  id: string;
  name: string;
  config: {
    baseline: number;
    rare: number;
    legend: number;
  };
  token: {
    mint: string;
    symbol: string;
    decimals: number;
    image: string;
  };
  nft: {
    mint: string;
  };
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id;

  let info = await connection.getAccountInfo(new PublicKey(id as string));
  let metaplex = new Metaplex(connection);

  let coder = new BorshAccountsCoder(IDL);
  let deser = coder.decode("sponsor", info?.data as Buffer);

  // Get SPL token info
  let tokenMetadata = await metaplex
    .nfts()
    .findByMint({ mintAddress: new PublicKey(deser.tokenMint) });

  let tokenInfo = await connection.getParsedAccountInfo(
    new PublicKey(deser.tokenMint)
  );
  //@ts-ignore
  let decimals = tokenInfo?.value?.data.parsed.info.decimals;

  let uri = await fetch(tokenMetadata.uri);
  let tokenJson = await uri.json();

  return {
    props: {
      id,
      name: deser.name,
      config: {
        baseline: deser.swapFactor[0],
        rare: deser.swapFactor[1],
        legend: deser.swapFactor[2],
      },
      token: {
        mint: deser.tokenMint.toString(),
        symbol: tokenMetadata.symbol,
        decimals: decimals,
        image: tokenJson.image,
      },
      nft: {
        mint: deser.nftMint.toString(),
      },
    },
  };
};

export default function Swap({ id, name, config, token, nft }: SwapProps) {
  return (
    <>
      <SEO
        title={`${name} | Gh0st Labs 404`}
        description="Swap SPL-404 Enabled tokens with the Gh0st Labs Hybrid DeFi portal."
        image="/ghostlabscover.png"
      />
      <Header />
      <WavyBackground className="w-full mx-auto">
        <main
          className={`relative flex min-h-screen flex-col items-center justify-center`}
        >
          <div className="z-50 w-full h-full mx-auto overflow-hidden">
            <SwapFrame
              id={id}
              name={name}
              config={config}
              token={token}
              nft={nft}
            />
          </div>
        </main>
      </WavyBackground>
    </>
  );
}
