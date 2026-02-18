"use client";
import StyledMovieCard from "../shared/MovieCardRating";
import LoadingSpinner from "../shared/LoadingSpinner";
import ErrorComponent from "../shared/ErrorComponent";
import NoData from "../shared/NoData";
import { useMovieStore } from "../../store/useMovieStore";
import { useEffect } from "react";

export default function MovieSections() {
  const { movies, loading, error, fetchMovies } = useMovieStore();

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorComponent error={error} />;
  if (movies.length === 0) return <NoData />;

  return (
    <section className="w-full">
      <h2 className="ml-[12%] mt-20 mb-6 text-2xl font-semibold text-white">
        Trending
      </h2>

      <div className="flex justify-center">
        <div className="flex gap-8">
          {movies.slice(0, 3).map((movie) => (
            <StyledMovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </section>
  );
}
