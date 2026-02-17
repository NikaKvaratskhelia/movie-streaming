"use client";
import StyledMovieCard from "@/src/components/shared/styled-movie-card";
import MovieCard from "@/src/components/shared/movie-card";
import { useMovieStore } from "@/src/store/use-move-store";
import { useEffect } from "react";

export default function MovieSections() {

  const { movies, loading, error, fetchMovies } = useMovieStore();

  useEffect(() => {fetchMovies()}, [fetchMovies]);
  
  if (loading) {
    return (
      <div className="text-center py-8">Loading movies...</div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">Error: {error}</div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="text-center py-8">No movies available</div>
    );
  }

  return (
    <section>
      <div className="bg-black p-6 px-20">
        <div className="flex justify-center gap-12.25">
          {movies.slice(0, 3).map((movie) => (
            <div key={movie.id} className="shrink-0 w-96">
              <StyledMovieCard movie={movie} />
            </div>
          ))}
        </div>
      </div>

      {movies.length > 3 && (
        <div className="px-20">
          <h3 className="text-xl font-bold mb-6">All Movies</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {movies.slice(3).map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
