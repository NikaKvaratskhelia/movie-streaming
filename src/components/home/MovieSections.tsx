"use client";
import StyledMovieCard from "../shared/MovieCardRating";
import LoadingSpinner from "../shared/LoadingSpinner";
import ErrorComponent from "../shared/ErrorComponent";
import NoData from "../shared/NoData";
import ViewAllLink from "../shared/ViewAllLink";
import { useMovieStore } from "../../store/useMovieStore";
import { useEffect } from "react";
import { useDataOnLoaded } from "../../hooks/useDataOnLoaded";

export default function MovieSections() {
  const { movies, loading, error, fetchMovies } = useMovieStore();

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  useDataOnLoaded({ data: movies, loading });

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorComponent error={error} />;
  if (movies.length === 0) return <NoData />;

  return (
    <section className="w-full">
      <div className="w-[75%] flex justify-between items-center ml-[12%] mr-[12%] mt-20 mb-6">
        <h2 className="text-2xl font-semibold text-white">
          Trending
        </h2>
        <ViewAllLink href="/trending" />
      </div>

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
