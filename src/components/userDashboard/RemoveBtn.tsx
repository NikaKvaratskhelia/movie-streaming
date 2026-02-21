import { useWatchlist } from "@/src/hooks/useWatchlist";

export default function RemoveBtn({
  type,
  id,
}: {
  type: "MOVIE" | "SERIES";
  id: number;
}) {
  const { removeMovie, removeSeries } = useWatchlist();
  function handleClick() {
    if (type === "MOVIE") {
      removeMovie(id);
    } else {
      removeSeries(id);
    }
  }
  return (
    <div
      className="opacity-0 z-2 group-hover:opacity-100 absolute bottom-2 left-2 py-2 px-2.5 bg-[#e05a5ad9] w-fit rounded-md text-[11px] transition-all duration-500 font-bold cursor-pointer"
      onClick={handleClick}
    >
      ✕ Remove
    </div>
  );
}
