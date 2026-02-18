import { Movie } from "@/generated/prisma/browser";
import Image from "next/image";
import { Clock, Heart } from "lucide-react";
import { useState } from "react";

export default function MovieCard({ movie, showDuration = true }: { movie: Movie; showDuration?: boolean }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <div className="w-[256px] h-auto  overflow-hidden bg-black text-white">
      <div 
        className="relative w-[256px] h-86 group" 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image
          src={movie.coverPhoto}
          alt={movie.title}
          fill
          className="object-cover rounded-[10px]"
        />

        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className={`absolute top-3 right-3 w-10 h-10 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 transform ${
            isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
          } hover:bg-black/80 hover:scale-110`}
        >
          <Heart 
            size={18} 
            className={`transition-colors duration-300 ${
              isWishlisted 
                ? 'fill-red-500 text-red-500' 
                : 'text-white hover:text-red-400'
            }`}
          />
        </button>
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
              <span>{movie.duration}</span>
            </div>
        </div>
      </div>
    </div>
  );
}
