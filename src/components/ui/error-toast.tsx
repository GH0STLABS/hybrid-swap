import { IconExclamationCircle } from "@tabler/icons-react";

export default function ErrorToast({ err }: { err: any }) {
  return (
    <div className="flex gap-2 items-center">
      <IconExclamationCircle className="w-5 h-5 text-red-500" />
      <label className="text-sm">{err.toString()}</label>
    </div>
  );
}
