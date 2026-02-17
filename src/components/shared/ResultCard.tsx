import Link from "next/link";
import { Movie } from "@/generated/prisma/browser";
import Image from "next/image";

export default function ResultCard({ movie }: { movie: Movie }) {
  return (
    <Link
      href={`/movies/${movie.id}`}
      key={movie.id}
      className="flex items-center gap-3 p-3 hover:bg-gray-800 cursor-pointer border-b border-gray-700 transition-all duration-500"
    >
      {movie.coverPhoto ? (
        <Image
          src={movie.coverPhoto}
          alt={movie.title}
          width={40}
          height={60}
          className="object-cover rounded"
        />
      ) : (
        <div className="w-10 h-15 bg-gray-700 rounded flex items-center justify-center text-gray-400 text-xs">
          No img
        </div>
      )}
      <div>
        <h4 className="font-semibold text-red-500">{movie.title}</h4>
        <p className="text-sm text-gray-400">{movie.genres?.join(", ")}</p>
      </div>
    </Link>
  );
}
