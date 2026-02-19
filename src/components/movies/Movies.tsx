import { Movie } from "@/generated/prisma/browser";
import MovieCard from "@/src/components/shared/MovieCard";

interface MovieGridProps {
  movies: Movie[];
}

export default function MovieGrid({ movies }: MovieGridProps) {
  if (movies.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold text-white mb-4">
          No Movies Available
        </h2>
        <p className="text-gray-400">
          Check back later for new movie releases.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-[32px]">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
