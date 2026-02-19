"use client";
import { useWatchlist } from "@/src/hooks/useWatchlist";
import { useAuthStore } from "@/src/store/useLoginStore";
import { Heart } from "lucide-react";
import { toast } from "sonner";

export default function AddToWatchlistBtn({
  id,
  category,
}: {
  id: number;
  category: "movie" | "series";
}) {
  const { token } = useAuthStore();
  const {
    addMovie,
    removeMovie,
    addSeries,
    removeSeries,
    movieWatchlist,
    seriesWatchlist,
    isAddingMovie,
    isAddingSeries,
  } = useWatchlist();

  const isInWatchlist =
    category === "movie"
      ? movieWatchlist.some((m) => m.movieId === id)
      : seriesWatchlist.some((s) => s.seriesId === id);

  const isPending = isAddingMovie || isAddingSeries;

  async function handleClick() {
    if (!token) {
      toast.error("You need to log in first!");
      return;
    }

    if (category === "movie") {
      if (isInWatchlist) {
        removeMovie(id);
        toast.success("Movie deleted from watchlist!");
      } else {
        addMovie(id);
        toast.success("Movie added to watchlist!");
      }
    } else {
      if (isInWatchlist) {
        removeSeries(id);
        toast.success("Series deleted from watchlist!");
      } else {
        addSeries(id);
        toast.success("Series added to watchlist!");
      }
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className="absolute top-3 right-3 w-10 h-10 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 transform group-hover:opacity-100 group-hover:scale-100 opacity-0 scale-75 hover:bg-black/80 hover:scale-110 cursor-pointer disabled:opacity-50"
    >
      <Heart
        size={18}
        className="transition-colors duration-300"
        fill={isInWatchlist ? "red" : "none"}
        stroke={isInWatchlist ? "red" : "currentColor"}
      />
    </button>
  );
}
