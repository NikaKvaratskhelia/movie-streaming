import { Series } from "@/generated/prisma/browser";
import Image from "next/image";
import { Tv, Star, Play } from "lucide-react";
import { useState, useEffect } from "react";
import { fetchSeasonsCount } from "../../services/seriesService";
import AddToWatchlistBtn from "../ui/AddToWatchlistBtn";
import Link from "next/link";

export default function SeriesCard({ series }: { series: Series }) {
  const [seasonsCount, setSeasonsCount] = useState<number>(0);

  useEffect(() => {
    const getSeasonsCount = async () => {
      const count = await fetchSeasonsCount(series.id);
      setSeasonsCount(count);
    };

    getSeasonsCount();
  }, [series.id]);

  return (
    <div className="w-[256px] h-auto  overflow-hidden bg-black text-white group">
      <div className="relative w-[256px] h-86 group">
        <Image
          src={series.coverPhoto}
          alt={series.title}
          fill
          className="object-cover rounded-[10px]"
        />

        <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1">
          <Star size={14} className="text-yellow-400 fill-yellow-400" />
          <span className="text-white text-sm font-medium">
            {Number(series.rating).toFixed(1)}
          </span>
        </div>

        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-[10px]">
          <Link href={`/details/series/${series.id}`} className="bg-red-600 rounded-full p-4 transform scale-90 group-hover:scale-100 transition-transform duration-300">
            <Play size={32} className="text-white fill-white" />
          </Link>
        </div>

        <AddToWatchlistBtn id={series.id} category="series" />
      </div>
      <Link
        href={`/details/series/${series.id}`}
        className="mt-4 flex justify-between items-center p-2"
      >
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
      </Link>
    </div>
  );
}
