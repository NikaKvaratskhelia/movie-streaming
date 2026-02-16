
"use client";
import { useEffect } from "react";
import Header from "@/src/components/layout/header";
import MovieHeroSection from "@/src/components/home/movie-hero-section";
import MovieCard from "@/src/components/shared/movie-card";
import { useMovieStore } from "@/src/store/use-move-store";

export default function Home() {
  const { movies, loading, error, fetchMovies } = useMovieStore();

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  return (
    <>
      <Header />
      <MovieHeroSection />

      <section className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Featured Movies</h2>

        {loading && (
          <div className="text-center py-8">Loading movies...</div>
        )}

        {error && (
          <div className="text-center py-8 text-red-500">Error: {error}</div>
        )}

        {!loading && !error && movies.length === 0 && (
          <div className="text-center py-8">No movies available</div>
        )}

        {!loading && !error && movies.length > 0 && (
          <div>
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}




