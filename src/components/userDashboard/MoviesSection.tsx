"use client";

import { useWatchlist } from "@/src/hooks/useWatchlist";
import { useAuthStore } from "@/src/store/useLoginStore";
import MovieCard from "./MovieCard";

export default function MoviesSection({ text }: { text: "Movies" | "Series" }) {
  const { token } = useAuthStore();
  const { movieWatchlist, seriesWatchlist } = useWatchlist(token ?? "");
  const watchlist = text === "Movies" ? movieWatchlist : seriesWatchlist;

  if (watchlist.length === 0) return null;

  return (
    <div className="text-white flex flex-col gap-4">
      <p className="text-[18px] font-semibold">{text}</p>
      <div className="flex gap-4 flex-wrap">
        {text === "Movies"
          ? movieWatchlist.map((e) => (
              <MovieCard type={"MOVIE"} id={e.movieId} key={e.id} />
            ))
          : seriesWatchlist.map((e) => (
              <MovieCard type={"SERIES"} id={e.seriesId} key={e.id} />
            ))}
      </div>
    </div>
  );
}
