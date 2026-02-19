import { Movie } from "@/generated/prisma/browser";
import ContentFilter from "@/src/components/shared/ContentFilter";

interface MovieHeaderProps {
  movies: Movie[];
  onFilteredMovies: (filteredMovies: Movie[]) => void;
}

export default function MovieHeader({ movies, onFilteredMovies }: MovieHeaderProps) {
  return (
    <>
      <div className="w-full px-4 lg:px-[12%] py-8 lg:py-12">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl lg:text-5xl font-bold text-white mb-4">
            All Movies
          </h1>
          <p className="text-gray-400 text-lg">
            Discover our complete collection of movies
          </p>
          <div className="mt-6 flex items-center gap-4">
            <div className="bg-red-600 text-white px-4 py-2 rounded-lg">
              {movies.length} Movies Available
            </div>
          </div>
        </div>
      </div>
      
      <ContentFilter 
        content={movies} 
        contentType="movie" 
        onFilteredContent={onFilteredMovies} 
      />
    </>
  );
}
