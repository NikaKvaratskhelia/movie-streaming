"use client";

import { useMovies } from "@/src/hooks/useMovie";
import MoviePageLayout from "@/src/components/movies/MoviePageLayout";

export default function MoviesPage() {
  const { movies, isLoading, error } = useMovies();

  return (
    <MoviePageLayout movies={movies} isLoading={isLoading} error={error} />
  );
}
