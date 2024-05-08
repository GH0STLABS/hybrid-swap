import "@/styles/globals.css";
import "98.css";
import type { AppProps } from "next/app";
import { SolanaProviders } from "@/providers/SolanaProvider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SolanaProviders>
      <Component {...pageProps} />
    </SolanaProviders>
  );
}
