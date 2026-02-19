"use client";

import { useWatchlist } from "@/src/hooks/useWatchlist";
import StatisticsDiv from "./StatisticsDiv";
import { getStatistics } from "@/src/services/watchlist-service";
import { useAuthStore } from "@/src/store/useLoginStore";
import { useQuery } from "@tanstack/react-query";

export default function Statistics() {
  const { movieWatchlist, seriesWatchlist } = useWatchlist();
  const { token } = useAuthStore();

  const { data } = useQuery({
    queryKey: ["watchlist-stats", token],
    queryFn: () => {
      if (!token) throw new Error("No token");
      return getStatistics(token);
    },
    enabled: !!token,
  });

  const avgRating = data?.avgRating ?? "0";
  const totalRuntime = data?.totalRuntime ?? 0;

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
