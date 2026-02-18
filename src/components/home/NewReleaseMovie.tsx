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
      <div className="w-[75%] flex justify-between items-center ml-[12%] mr-[12%] mt-20 mb-6">
        <h2 className="text-2xl font-semibold text-white">
          New Release - Movies
        </h2>
        <ViewAllLink href="/movies" />
      </div>
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
