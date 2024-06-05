import { IconTrophy } from "@tabler/icons-react";

export default function RarityToast({ rarity }: { rarity: string}) {
  return (
    <div className="flex gap-2 items-center">
      <IconTrophy className="w-5 h-5 text-yellow-500" />
      <label className="text-lg">You pulled a {rarity}!</label>
    </div>
  );
}
