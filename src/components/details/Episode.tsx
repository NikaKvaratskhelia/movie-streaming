import { Episode } from "@/generated/prisma/browser";
import { Play } from "lucide-react";

export default function Episodes({
  ep,
  active,
  onClick,
}: {
  ep: Episode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className={`${active ? "bg-[#ff0000] text-white" : "bg-white text-black"} p-2.5 pl-4 rounded-md flex gap-4 cursor-pointer select-none max-w-136 w-full`}
      onClick={onClick}
    >
      <div className="flex gap-2">
        <Play className={`${active ? "fill-white" : "fill-black"}`} />
        <p className="font-semibold">Episode {ep.countInSeason}:</p>
      </div>
      <p>{ep.title}</p>
    </div>
  );
}
