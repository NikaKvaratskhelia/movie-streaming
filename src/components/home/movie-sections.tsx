import StyledMovieCard from "@/src/components/shared/styled-movie-card";
import MovieCard from "@/src/components/shared/movie-card";
import { Movie } from "../../../generated/prisma/client";

interface MovieSectionsProps {
  movies: Movie[];
  loading: boolean;
  error: string | null;
}

export default function MovieSections({ movies, loading, error }: MovieSectionsProps) {
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
    <>
      {/* Top 3 Highest Rated Movies */}
      <div className="mb-12">
        <h3 className="text-xl font-bold mb-6">Top Rated Movies</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {movies.slice(0, 3).map((movie) => (
            <StyledMovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>

      {/* All Other Movies */}
      {movies.length > 3 && (
        <div>
          <h3 className="text-xl font-bold mb-6">All Movies</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {movies.slice(3).map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
