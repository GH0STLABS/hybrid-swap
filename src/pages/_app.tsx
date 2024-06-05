import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SolanaProviders } from "@/providers/SolanaProvider";
import { Toaster } from "@/components/ui/toaster";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SolanaProviders>
      <Toaster expand={true} />
      <Component {...pageProps} />
    </SolanaProviders>
  );
}
