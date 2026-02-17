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

export default function NewReleaseMovie({ movies: propMovies, limit }: MovieSectionProps) {
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
    <div className="w-full flex flex-col items-center">
      {/* Title */}
      <div className="w-full max-w-[1200px] mb-[33px]">
        <h2 className="text-white text-[24px] font-semibold">
          New Release - Movies
        </h2>
      </div>

      {/* Cards */}
      <div className="flex gap-[33px]">
        {movies.slice(0, limit).map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
