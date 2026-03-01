"use client";

import MovieCardRating from "../shared/MovieCardRating";
import ViewAllLink from "../shared/ViewAllLink";
import { useMovies } from "@/src/hooks/useMovie";

export default function MovieSections() {
  const { movies = [] } = useMovies();
  return (
    <section>
      <div className="w-full flex justify-between items-center mt-12 lg:mt-20 mb-6 px-8">
        <h2 className="text-xl lg:text-2xl font-semibold text-white">
          Trending
        </h2>
        <ViewAllLink href="/trending" />
      </div>

      <div className="flex justify-center">
        <div className="flex flex-wrap gap-8 justify-center">
          {movies.slice(0, 3).map((movie) => (
            <MovieCardRating key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </section>
  );
}