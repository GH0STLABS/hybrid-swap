import SynthwaveScene from "@/components/ui/grid-animation";
import Header from "@/components/header";
import SwapFrame from "@/components/swap";
import { useEffect } from "react";

export default function Swap() {
  return (
    <>
      <Header />
      <main
        className={`relative flex min-h-screen flex-col items-center justify-center`}
      >
        <div className="w-full mx-auto h-screen overflow-hidden">
          <SwapFrame />
          <div className="absolute -z-50 w-full bottom-0 h-3/4">
            <SynthwaveScene />
          </div>
        </div>
      </main>
    </>
  );
}