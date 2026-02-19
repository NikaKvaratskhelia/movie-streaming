import { Series } from "@/generated/prisma/browser";
import Image from "next/image";
import { Heart, Tv } from "lucide-react";
import { useState, useEffect } from "react";
import { fetchSeasonsCount } from "../../services/seriesService";

export default function SeriesCard({ series }: { series: Series }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [seasonsCount, setSeasonsCount] = useState<number>(0);

  useEffect(() => {
    const getSeasonsCount = async () => {
      const count = await fetchSeasonsCount(series.id);
      setSeasonsCount(count);
    };

    getSeasonsCount();
  }, [series.id]);
  
  return (
    <div className="w-[256px] h-auto  overflow-hidden bg-black text-white">
      <div 
        className="relative w-[256px] h-86 group" 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image
          src={series.coverPhoto}
          alt={series.title}
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
          {series.title.length > 10
            ? series.title.slice(0, 10) + "..."
            : series.title}
        </h3>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#FF0000] rounded-md flex items-center justify-center text-[12px] font-bold">
            HD
          </div>
            <div className="w-20 h-8 border border-[#FF0000] rounded-md flex items-center justify-center gap-1 text-[12px]">
              <Tv size={14} />
              <span>{seasonsCount} Seasons</span>
            </div>
        </div>
      </div>
    </div>
  );
}
