"use client";
import StyledMovieCard from "../shared/MovieCardRating";
import MovieCard from "../shared/MovieCard";
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
    <section>
      <div className="w-full flex justify-center">
        <div className="flex gap-[33px]">
          {movies.slice(0, 3).map((movie) => (
            <StyledMovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>


    </section>
  );
}
