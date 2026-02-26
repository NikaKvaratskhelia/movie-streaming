import { useWatchlist } from "@/src/hooks/useWatchlist";
import { useAuthStore } from "@/src/store/useLoginStore";
import { Check, Plus } from "lucide-react";
import { toast } from "sonner";

export default function AddToWatchlist({
  type,
  id,
}: {
  type: "movie" | "series" | undefined;
  id: number | null;
}) {
  const { addMovie, addSeries, movieWatchlist, seriesWatchlist } =
    useWatchlist();
  const { token } = useAuthStore();

  const isInWatchlist =
    type === "movie"
      ? movieWatchlist.some((m) => m.movieId === id)
      : seriesWatchlist.some((s) => s.seriesId === id);

  async function handleClick() {
    if (!token) {
      toast.error("You need to log in first");
      return;
    }

    try {
      if (type === "movie" && id) {
        await addMovie(id);
      } else if (type === "series" && id) {
        await addSeries(id);
      }
    } catch {
      toast.error("Something went wrong");
    }
  }
  return (
<button
  className="
    flex items-center justify-center gap-2 bg-[#ff0000] rounded-2xl cursor-pointer text-nowrap

    sm:p-4 p-2
    sm:text-base text-sm

    max-[400px]:px-3
  "
  onClick={handleClick}
>
  {isInWatchlist ? (
    <>
      <Check className="w-5 sm:w-5" />
      <p className="ml-2">
        Added To Watchlist
      </p>
    </>
  ) : (
    <>
      <Plus className="w-5 sm:w-5" />
      <p className="ml-2 sm:block hidden">
        Add To Watchlist
      </p>
    </>
  )}
</button>
  );
}
