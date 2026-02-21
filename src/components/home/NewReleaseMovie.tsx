"use client";
import { Movie } from "@/generated/prisma/browser";
import MovieCard from "../shared/MovieCard";
import ViewAllLink from "../shared/ViewAllLink";
import { useMovies } from "@/src/hooks/useMovie";

interface MovieSectionProps {
  movies?: Movie[];
  limit: number;
  onLoaded?: () => void;
}

export default function NewReleaseMovie({
  movies: propMovies,
  limit,
}: MovieSectionProps) {
  const { movies: storeMovies } = useMovies();

  const movies = propMovies || storeMovies;

  return (
    <div className="flex flex-col items-start">
      <div className="w-full flex justify-between items-center mt-12 lg:mt-20 mb-6 px-8">
        <h2 className="text-xl lg:text-2xl font-semibold text-white">
          New Release - Movies
        </h2>
        <ViewAllLink href="/movies" />
      </div>
      <div className="w-full flex justify-center">
        <div className="flex flex-wrap gap-8">
          {movies.slice(0, limit).map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
}
