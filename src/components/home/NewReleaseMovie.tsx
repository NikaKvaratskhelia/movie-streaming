"use client";
import { Movie } from "@/generated/prisma/browser";
import MovieCard from "../shared/MovieCard";
import LoadingSpinner from "../shared/LoadingSpinner";
import ErrorComponent from "../shared/ErrorComponent";
import NoData from "../shared/NoData";
import { useMovieStore } from "../../store/useMovieStore";
import { useEffect } from "react";

interface MovieSectionProps {
  movies?: Movie[];
  limit: number;
}

export default function NewReleaseMovie({
  movies: propMovies,
  limit,
}: MovieSectionProps) {
  const { movies: storeMovies, loading, error, fetchMovies } = useMovieStore();

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const movies = propMovies || storeMovies;

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorComponent error={error} />;
  }

  if (movies.length === 0) {
    return <NoData />;
  }

  return (
    <div className="w-full flex flex-col items-start">
      <h2 className="ml-[12%] mt-20 mb-6 text-2xl font-semibold text-white">
        New Release - Movies
      </h2>
      <div className="w-full flex justify-center">
        <div className="flex gap-8.25">
          {movies.slice(0, limit).map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
}
