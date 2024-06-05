import { IconSwitchHorizontal } from "@tabler/icons-react";

export default function SwapButton() {
  return (
    <button className="relative w-full inline-flex h-12 overflow-hidden rounded-lg p-[1px] focus:outline-none">
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#FF64D8_0%,#31e4cf_50%,#FF64D8_100%)]" />
        <span className="inline-flex gap-2 h-full w-full cursor-pointer items-center justify-center rounded-lg bg-slate-950 px-3 py-1 text-lg font-medium text-white backdrop-blur-3xl">
          <IconSwitchHorizontal className="w-5 h-5" />
          Swap
        </span>
    </button>
  );
}
