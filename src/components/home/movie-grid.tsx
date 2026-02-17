import { Movie } from "../../../generated/prisma/client";
import MovieCard from "@/src/components/shared/MovieCard";

interface MovieGridProps {
  movies: Movie[];
  loading: boolean;
}

export default function MovieGrid({ movies, loading }: MovieGridProps) {
  return (
    <section className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Featured Movies</h2>

      {loading ? (
        <div className="text-center py-8">Loading movies...</div>
      ) : movies.length === 0 ? (
        <div className="text-center py-8">No movies available</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </section>
  );
}
