"use client";
import { useEffect, useState, useMemo } from "react";
import { useMovieStore } from "@/src/store/useMovieStore";
import { useSeriesStore } from "@/src/store/useSeriesStore";
import ResultCard from "./result-card";

const SearchInput = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { movies, fetchMovies } = useMovieStore();
  const { series, fetchSeries } = useSeriesStore();

  useEffect(() => {
    fetchMovies();
    fetchSeries();
  }, [fetchMovies, fetchSeries]);

  const filteredItems = useMemo(() => {
    const combined = [
      ...movies.map((m) => ({ ...m, type: "movie" as const })),
      ...series.map((s) => ({ ...s, type: "series" as const })),
    ];
    return combined.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [movies, series, searchTerm]);

  return (
    <div className="relative w-70">
      <div className="relative">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="
                w-full h-11 px-4 pr-10
                rounded-full
                bg-white/5
                border border-white/10
                text-white placeholder:text-white/40
                backdrop-blur-md
                focus:outline-none
                focus:border-red-600
                focus:ring-2 focus:ring-red-600/40
                transition-all duration-200
              "
        />

        <svg
          className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-white/60"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35M16 10a6 6 0 11-12 0 6 6 0 0112 0z"
          />
        </svg>
      </div>

      {searchTerm && (
        <div className="absolute top-14 left-0 right-0 bg-neutral-900 border border-white/10 rounded-xl shadow-2xl max-h-96 overflow-y-auto z-50">
          {filteredItems.length > 0 ? (
            filteredItems.map((movie) => (
              <ResultCard data={movie} key={movie.id} />
            ))
          ) : (
            <div className="p-4 text-white/50 text-sm">
              No results for &quot;{searchTerm}&quot;
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
