"use client";

import { useWatchlist } from "@/src/hooks/useWatchlist";
import StatisticsDiv from "./StatisticsDiv";

export default function Statistics() {
  const { movieWatchlist, seriesWatchlist, avgRating, totalRuntime } = useWatchlist();

  return (
    <div className="flex flex-wrap gap-4">
      <StatisticsDiv
        text={movieWatchlist.length.toString()}
        label="Movies in your watchlist"
        heading="Movies"
      />

      <StatisticsDiv
        text={seriesWatchlist.length.toString()}
        label="Series in your watchlist"
        heading="Series"
      />

      <StatisticsDiv
        text={avgRating.toString()}
        label="Your watchlists average rating"
        heading="AVG. Rating"
      />

      <StatisticsDiv
        text={`${totalRuntime}`}
        label="Est. total runtime"
        heading="WATCH TIME"
      />
    </div>
  );
}
