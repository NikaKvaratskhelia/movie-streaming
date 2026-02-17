
"use client";
import { useEffect } from "react";
import Header from "@/src/components/layout/header";
import MovieHeroSection from "@/src/components/home/movie-hero-section";
import RecentlyUpdated from "@/src/components/home/RecentlyUpdated";
import MovieSections from "@/src/components/home/movie-sections";
import { useMovieStore } from "@/src/store/use-move-store";

export default function Home() {
  const { movies, loading, error, fetchMovies } = useMovieStore();

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  return (
    <>
    <header>
      <Header />
    </header>
    <main>
      <MovieHeroSection />
    </main>
    <section>
      <RecentlyUpdated />
    </section>

    <section>
      <MovieSections movies={movies} loading={loading} error={error} />
    </section>
    </>
  );
}



