"use client";
import StyledMovieCard from "../shared/MovieCardRating";
import ViewAllLink from "../shared/ViewAllLink";
import { useMovieStore } from "../../store/useMovieStore";
import { useEffect } from "react";

export default function MovieSections() {
  const { movies, fetchMovies } = useMovieStore();

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  return (
    <section className="w-full">
      <div className="w-full lg:w-[75%] flex justify-between items-center px-4 lg:ml-[12%] lg:mr-[12%] mt-12 lg:mt-20 mb-6">
        <h2 className="text-xl lg:text-2xl font-semibold text-white">
          Trending
        </h2>
        <ViewAllLink href="/trending" />
      </div>

      <div className="flex justify-center px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
          {movies.slice(0, 3).map((movie) => (
            <StyledMovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </section>
  );
}
