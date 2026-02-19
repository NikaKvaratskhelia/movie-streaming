"use client";

import { useWatchlist } from "@/src/hooks/useWatchlist";
import MovieCard from "./MovieCard";

export default function MoviesSection({ text }: { text: "Movies" | "Series" }) {
  const { movieWatchlist, seriesWatchlist } = useWatchlist();
  const watchlist = text === "Movies" ? movieWatchlist : seriesWatchlist;

  console.log(seriesWatchlist);

  if (watchlist.length === 0) return null;

  return (
    <div className="text-white flex flex-col gap-4">
      <p className="text-[18px] font-semibold">{text}</p>
      <div className="flex gap-4 flex-wrap">
        {text === "Movies"
          ? movieWatchlist.map((e) => (
              <MovieCard type={"MOVIE"} movie={e.movie} key={e.id} />
            ))
          : seriesWatchlist.map((e) => (
              <MovieCard type={"SERIES"} series={e.series} key={e.id} />
            ))}
      </div>
    </div>
  );
}
