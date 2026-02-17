"use client";
import { useState } from "react";
import { useMovieStore } from "@/src/store/use-move-store";
import ResultCard from "./result-card";

const SearchInput = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { movies } = useMovieStore();

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative mx-6">
      <input
        type="text"
        placeholder="Search movies..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-104 h-12 px-4 rounded-full bg-white text-black placeholder:text-gray-500"
      />

      <svg
        className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 text-black"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-4.35-4.35M16 10a6 6 0 11-12 0 6 6 0 0112 0z"
        />
      </svg>

      {searchTerm && (
        <div className="absolute top-14 left-0 right-0 bg-black rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
          {filteredMovies.length > 0 ? (
            filteredMovies.map((movie) => (
              <ResultCard movie={movie} key={movie.id}/>
            ))
          ) : (
            <div className="p-3 text-gray-400">
              No movies found for &quot;{searchTerm}&quot;
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
