"use client";

import { useWatchlist } from "@/src/hooks/useWatchlist";
import { useMovieStore } from "@/src/store/useMovieStore";
import { useSeriesStore } from "@/src/store/useSeriesStore";

export default function Loader({
  loadingProp = false,
}: {
  loadingProp?: boolean;
}) {

  const { loading } = useSeriesStore();
  const loading1 = useMovieStore((s) => s.loading);
  const { isLoading } = useWatchlist();

  const showLoader = loading || loading1 || isLoading || loadingProp;
  return showLoader ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="relative flex flex-col items-center gap-6">
        <div className="absolute h-56 w-56 rounded-full bg-red-600/30 blur-3xl animate-pulse"></div>

        <div className="relative h-28 w-28 rounded-full border-4 border-red-600 animate-spin flex items-center justify-center shadow-[0_0_40px_rgba(220,38,38,0.6)]">
          <div className="absolute grid grid-cols-3 gap-2">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className="h-3 w-3 rounded-full bg-black border border-red-500"
              ></div>
            ))}
          </div>
        </div>

        <p className="text-red-500 tracking-[0.3em] text-sm font-semibold animate-pulse">
          LOADING CINEMA
        </p>
      </div>
    </div>
  ) : null;
}
