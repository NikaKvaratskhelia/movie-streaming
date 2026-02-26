import MovieCard from "@/src/components/shared/MovieCard";
import { Movie } from "@/generated/prisma/browser";

interface ActorMovieProps {
  movies?: Movie[];
}

export default function ActorMovie({ movies }: ActorMovieProps) {
  return (
    <div className="text-white">
      <h2 className="text-2xl text-center font-bold mb-6">Movie</h2>
      
      {!movies || movies.length === 0 ? (
        <p className="text-gray-400 text-center">No movies found</p>
      ) : (
        <div className="flex flex-wrap justify-center gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}
