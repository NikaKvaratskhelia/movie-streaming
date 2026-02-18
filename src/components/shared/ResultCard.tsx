import Link from "next/link";
import { Movie } from "@/generated/prisma/browser";
import Image from "next/image";

export default function ResultCard({ movie }: { movie: Movie }) {
  return (
    <Link
      href={`/movies/${movie.id}`}
      className="
        flex items-center gap-4 px-4 py-3
        hover:bg-white/5
        transition-all duration-200
        group
      "
    >
      <div className="relative w-10.5 h-15 shrink-0 overflow-hidden rounded-md">
        {movie.coverPhoto ? (
          <Image
            src={movie.coverPhoto}
            alt={movie.title}
            fill
            sizes="42px"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-neutral-800 flex items-center justify-center text-xs text-white/40">
            N/A
          </div>
        )}
      </div>

      <div className="flex flex-col">
        <h4 className="text-sm font-medium text-white group-hover:text-red-500 transition-colors duration-200">
          {movie.title}
        </h4>

        {movie.genres && movie.genres.length > 0 && (
          <p className="text-xs text-white/40 mt-1">
            {movie.genres.join(" • ")}
          </p>
        )}
      </div>
    </Link>
  );
}
