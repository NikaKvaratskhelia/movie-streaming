"use client";

import { useState } from "react";
import { Movie } from "@/generated/prisma/browser";
import MovieHeader from "./MovieHeader";
import MovieGrid from "./Movies";

interface MoviePageLayoutProps {
  movies: Movie[];
  isLoading: boolean;
  error: any;
}

export default function MoviePageLayout({ 
  movies, 
  isLoading, 
  error 
}: MoviePageLayoutProps) {
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>(movies);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Error Loading Movies</h2>
          <p className="text-gray-400">Failed to load movies. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <MovieHeader 
        movies={movies} 
        onFilteredMovies={setFilteredMovies} 
      />
      
      <div className="w-full px-4 lg:px-[12%] pb-12">
        <div className="max-w-7xl mx-auto">
          <MovieGrid movies={filteredMovies} />
        </div>
      </div>
    </div>
  );
}
