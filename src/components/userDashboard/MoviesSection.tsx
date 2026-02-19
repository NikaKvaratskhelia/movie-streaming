"use client";

import { useWatchlist } from "@/src/hooks/useWatchlist";
import { useAuthStore } from "@/src/store/useLoginStore";
import MovieCard from "./MovieCard";

export default function MoviesSection({ text }: { text: "Movies" | "Series" }) {
  const { token } = useAuthStore();
  const { movieWatchlist, seriesWatchlist } = useWatchlist(token ?? "");
  return (
    <div className="text-white flex flex-col gap-4">
      <p className="text-[18px] font-semibold">{text}</p>
      <div className="flex gap-4 flex-wrap">
        {text === "Movies"
          ? movieWatchlist.map((e, index) => (
              <MovieCard type={"MOVIE"} id={e.movieId} key={index} />
            ))
          : seriesWatchlist.map((e, index) => (
              <MovieCard type={"SERIES"} id={e.seriesId} key={index} />
            ))}
      </div>
    </div>
  );
}
