"use client";
import StyledMovieCard from "../shared/MovieCardRating";
import ViewAllLink from "../shared/ViewAllLink";
import { useMovies } from "@/src/hooks/useMovie";

export default function MovieSections() {
  const { movies } = useMovies();

  return (
    <section>
      <div className="w-full flex justify-between items-center mt-12 lg:mt-20 mb-6">
        <h2 className="text-xl lg:text-2xl font-semibold text-white px-8">
          Trending
        </h2>
        <ViewAllLink href="/trending" />
      </div>

      <div className="flex justify-center">
        <div className="flex flex-wrap gap-8">
          {movies.slice(0, 3).map((movie) => (
            <StyledMovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </section>
  );
}
