import Image from "next/image";
import { Movie } from "../../../generated/prisma/client";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <div>
      <div>
        <Image
          src={movie.coverPhoto}
          alt={movie.title}
          width={300}
          height={450}
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3>{movie.title}</h3>
        <p>{movie.description}</p>
        <div>
          <span>{movie.yearPublished}</span>
        </div>
      </div>
    </div>
  );
}
