"use client";
import { Movie } from "@/generated/prisma/browser";
import MovieCard from "../shared/MovieCard";
import LoadingSpinner from "../shared/LoadingSpinner";
import ErrorComponent from "../shared/ErrorComponent";
import NoData from "../shared/NoData";
import ViewAllLink from "../shared/ViewAllLink";
import { useMovieStore } from "../../store/useMovieStore";
import { useEffect } from "react";
import { useDataOnLoaded } from "../../hooks/useDataOnLoaded";
import Link from "next/link";

interface MovieSectionProps {
  movies?: Movie[];
  limit: number;
  onLoaded?: () => void;
}

export default function NewReleaseMovie({
  movies: propMovies,
  limit,
  onLoaded,
}: MovieSectionProps) {
  const { movies: storeMovies, loading, error, fetchMovies } = useMovieStore();

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const movies = propMovies || storeMovies;

  useDataOnLoaded({ data: movies, loading, onLoaded });

  if (error) {
    return <ErrorComponent error={error} />;
  }

  if (movies.length === 0) {
    return <NoData />;
  }

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
