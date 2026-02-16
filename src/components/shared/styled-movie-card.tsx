import Image from "next/image";
import { Movie } from "../../../generated/prisma/client";

interface StyledMovieCardProps {
  movie: Movie;
}

export default function StyledMovieCard({ movie }: StyledMovieCardProps) {
  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-gray-900 text-white rounded-xl overflow-hidden w-72 relative shadow-lg">
      {movie.coverPhoto ? (
        <Image
          src={movie.coverPhoto}
          alt={movie.title}
          width={288}
          height={192}
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="w-full h-48 bg-gray-700 flex items-center justify-center text-gray-400">
          No Cover
        </div>
      )}
      <button className="absolute inset-0 flex items-center justify-center text-white text-3xl bg-black/40 hover:bg-black/50 transition">
        ▶
      </button>

      <div className="absolute top-2 left-2 flex items-center gap-2 text-sm bg-black/50 px-2 py-1 rounded">
        <span>⏱ {formatDuration(movie.duration || 0)}</span>
        <span>⭐ {movie.rating || 0}</span>
        <span>📅 {movie.yearPublished}</span>
      </div>

      <div className="p-4">
        <h2 className="text-lg font-bold mb-2">{movie.title}</h2>
        <div className="flex gap-2 flex-wrap">
          {(movie.genres || []).map((genre: string, index: number) => (
            <span
              key={index}
              className="bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded"
            >
              {genre}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
