import Image from "next/image";
import { Movie } from "../../../generated/prisma/client";
import { Play } from "lucide-react";

interface StyledMovieCardProps {
  movie: Movie;
}

export default function StyledMovieCard({ movie }: StyledMovieCardProps) {
  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}:${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const coverPhoto =
    movie.coverPhoto && isValidUrl(movie.coverPhoto) ? movie.coverPhoto : null;

  return (
    <div className="w-full xs:w-full sm:w-88 max-w-88 mx-auto">
      <div className="relative w-full h-auto aspect-352/293 group">
        {coverPhoto ? (
          <Image
            src={coverPhoto}
            alt={movie.title}
            fill
            className="w-full h-full object-cover rounded-[10px]"
          />
        ) : (
          <div className="w-full h-full bg-gray-700 flex items-center justify-center text-gray-400 rounded-[10px]">
            No Cover
          </div>
        )}
     <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-[10px]">
          <div className="bg-red-600 rounded-full p-4 transform scale-90 group-hover:scale-100 transition-transform duration-300">
            <Play size={32} className="text-white fill-white" />
          </div>
        </div>
        <div className="absolute top-3 left-3 text-white text-[16px]">
          {formatDuration(movie.duration || 0)}
        </div>
        <div className="absolute top-3 right-3 text-white text-[16px] flex items-center gap-1">
          {Number(movie.rating) || 0}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-2.5 gap-2">
        <h3 className="text-white text-[24px] font-semibold">
          {movie.title.length > 10
            ? movie.title.slice(0, 10) + "..."
            : movie.title}
        </h3>

        <div className="flex flex-wrap gap-2">
          {(movie.genres || [])
            .slice(0, 2)
            .map((genre: string, index: number) => (
              <span
                key={index}
                className="bg-red-600 text-white h-10 px-4 rounded-lg flex items-center text-sm"
              >
                {genre}
              </span>
            ))}
        </div>
      </div>
    </div>
  );
}
