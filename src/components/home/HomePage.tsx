"use client";

import { useMovieStore } from "@/src/store/useMovieStore";
import { useSeriesStore } from "@/src/store/useSeriesStore";
import Loader from "../ui/Loader";
import Hero from "./Hero";
import MovieSections from "./MovieSections";
import NewReleaseMovie from "./NewReleaseMovie";
import NewReleaseSeries from "./NewReleaseSeries";

export default function HomeImport() {
  const { loading } = useMovieStore();
  const loadingSeries = useSeriesStore((s) => s.loading);

  const isLoading = loading || loadingSeries;

  return (
    <div className="relative">
      <div
        className={`transition-opacity duration-700 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      >
        <Hero />
        <MovieSections />
        <NewReleaseMovie limit={4} />
        <NewReleaseSeries limit={4} />
      </div>
      {isLoading && <Loader />}
    </div>
  );
}
