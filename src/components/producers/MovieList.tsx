import { Movie } from "@/generated/prisma/browser";
import MovieCard from "@/src/components/shared/MovieCard";

interface MovieListProps {
  movies: Movie[];
}

export default function MovieList({ movies }: MovieListProps) {
  if (movies.length === 0) {
    return (
      <div className="text-gray-400 text-lg text-center">
        No movies found for this producer
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center flex-wrap gap-6">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
