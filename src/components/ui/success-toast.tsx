import { IconChecks } from "@tabler/icons-react";
import Link from "next/link";

export default function SuccessToast({ data }: { data: string }) {
  return (
    <div className="w-full flex gap-2 items-center justify-between">
      <div className="flex gap-2 items-center">
        <IconChecks className="w-5 h-5 text-green-500" />
        <label className="text-lg">Successfully Swapped!</label>
      </div>
      <Link
        href={`https://solscan.io/tx/${data}`}
        target="_blank"
        rel="noopener noreferrer"
        passHref
      >
        <button className="px-4 py-2 rounded-md border border-neutral-300 bg-neutral-100 text-neutral-500 text-sm hover:-translate-y-1 transform transition duration-200 hover:shadow-md">
          View
        </button>
      </Link>
    </div>
  );
}
