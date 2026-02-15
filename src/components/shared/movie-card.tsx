import { Movie } from "../../../generated/prisma/client";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <div >
      <div>
        <img
          src={movie.coverPhoto}
          alt={movie.title}
          
        />
      </div>
      <div className="p-4">
        <h3>
          {movie.title}
        </h3>
        <p>
          {movie.description}
        </p>
        <div>
          <span>{movie.yearPublished}</span>
        </div>
      </div>
    </div>
  );
}
