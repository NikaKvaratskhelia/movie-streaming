import { Movie } from "@/generated/prisma/browser";
import MovieCard from "@/src/components/shared/MovieCard";

interface MovieGridProps {
  movies: Movie[];
}

export default function MovieGrid({ movies }: MovieGridProps) {
  if (movies.length === 0) {
    return (
      <div className="text-center py-12 lg:py-20">
        <h2 className="text-xl lg:text-2xl font-semibold text-white mb-3 lg:mb-4">
          No Movies Available
        </h2>
        <p className="text-gray-400 text-sm lg:text-base">
          Check back later for new movie releases.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center items-center gap-4 lg:gap-8">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
