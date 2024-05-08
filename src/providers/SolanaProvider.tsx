import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
  ConnectionProvider,
  WalletProvider,
  useWallet,
} from "@solana/wallet-adapter-react";
import {
  LedgerWalletAdapter,
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import React, { useMemo } from "react";
import { Cluster } from "@solana/web3.js";

export const DEFAULT_ENDPOINT = `https://rpc.ironforge.network/${process.env.NEXT_PUBLIC_SOLANA_ENVIRONMENT}?apiKey=${process.env.NEXT_PUBLIC_IRONFORGE_API_KEY}`;

// Default styles that can be overridden by your app
require("@solana/wallet-adapter-react-ui/styles.css");

export const SolanaProviders = ({ children }: any) => {
  const wallets = useMemo(
    () => [
      new SolflareWalletAdapter(),
      new TorusWalletAdapter(),
      new LedgerWalletAdapter(),
      new PhantomWalletAdapter(),
    ],
    []
  );

  return (
    <ConnectionProvider endpoint={DEFAULT_ENDPOINT}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
