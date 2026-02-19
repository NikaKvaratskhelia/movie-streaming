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
    <div className="w-full flex flex-col items-start">
      <div className="w-full lg:w-[75%] flex justify-between items-center px-4 lg:ml-[12%] lg:mr-[12%] mt-12 lg:mt-20 mb-6">
        <h2 className="text-xl lg:text-2xl font-semibold text-white">
          New Release - Movies
        </h2>
        <ViewAllLink href="/movies" />
      </div>
      <div className="w-full flex justify-center px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8.25">
          {movies.slice(0, limit).map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
}
