import { Movie } from "@/generated/prisma/browser";
import Image from "next/image";
import { Clock } from "lucide-react";
import AddToWatchlistBtn from "../ui/AddToWatchlistBtn";

export default function MovieCard({ movie }: { movie: Movie }) {
  return (
    <div className="w-[256px] h-auto  overflow-hidden bg-black text-white group">
      <div className="relative w-[256px] h-86">
        <Image
          src={movie.coverPhoto}
          alt={movie.title}
          fill
          className="object-cover rounded-[10px]"
        />

        <AddToWatchlistBtn id={movie.id} category="movie" />
      </div>
      <div className="mt-4 flex justify-between items-center p-2">
        <h3 className="text-[16px]">
          {movie.title.length > 10
            ? movie.title.slice(0, 10) + "..."
            : movie.title}
        </h3>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#FF0000] rounded-md flex items-center justify-center text-[12px] font-bold">
            HD
          </div>
          <div className="w-20 h-8 border border-[#FF0000] rounded-md flex items-center justify-center gap-1 text-[12px]">
            <Clock size={14} />
            <span>{Math.ceil(movie.duration / 60)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
