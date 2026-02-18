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

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const coverPhoto = movie.coverPhoto && isValidUrl(movie.coverPhoto) ? movie.coverPhoto : null;

  return (
    <div className="relative w-full rounded-lg shadow-lg group">
      {coverPhoto ? (
        <Image
          src={coverPhoto}
          alt={movie.title}
          width={352}
          height={300}
          className="w-full h-73 rounded-[10px] object-cover "
        />
      ) : (
        <div className="w-full h-auto bg-gray-700 flex items-center justify-center text-gray-400">
          No Cover
        </div>
      )}
      
      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-50 transition-opacity duration-300">
        <button className="text-white text-6xl">
          ▶
        </button>
      </div>
      
      <div className="absolute top-2 left-2 text-white text-xs px-2 py-1 rounded-full">
        {formatDuration(movie.duration || 0)}
      </div>
      
      <div className="absolute top-2 right-2 text-white text-xs px-2 py-1 rounded-full flex items-center">
        {movie.rating || 0}
      </div>
      
      <div className="flex justify-between items-start p-2.5">
        <h3 className="text-white text-lg font-bold mb-2 truncate flex-1 mr-2">
          {movie.title.length > 11 ? `${movie.title.slice(0, 11)}...` : movie.title}
        </h3>
        <div className="flex flex-wrap gap-2 shrink-0">
          {(movie.genres || []).map((genre: string, index: number) => (
            <span
              key={index}
              className="text-white bg-[#FF0000] w-auto h-10 rounded-[10px] p-1.25 flex items-center"
            >
              {genre}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
