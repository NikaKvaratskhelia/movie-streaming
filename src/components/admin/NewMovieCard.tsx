import { Movie } from "@/generated/prisma/browser";
import { SeriesWithCount } from "@/src/types/SeriesWithCount";
import { Star } from "lucide-react";

type MovieProps = {
  type: "movie";
  data: Movie;
};

type SeriesProps = {
  type: "series";
  data: SeriesWithCount;
};

type Props = MovieProps | SeriesProps;

export default function NewMovieCard({ data, type }: Props) {
  return (
    <div className="w-full flex justify-between items-center bg-[#1a1e26] p-3 rounded-[10px]">
      <div>
        <h2 className="text-sm text-[#edebe9] font-medium">{data.title}</h2>

        <div className="flex items-center justify-start gap-2 text-xs text-[#737b8c]">
          <span>{data.yearPublished}</span>

          <span className="h-1 w-1 rounded-full bg-[#737b8c]" />

          {type === "movie" ? (
            <span>{Math.floor(data.duration / 60)} Mins</span>
          ) : (
            <span>{data._count.seasons} Seasons</span>
          )}
        </div>
      </div>

      <div className="flex justify-center items-center gap-1 text-amber-300">
        <Star fill="currentcolor" height={12} width={12}/> <p className="text-sm font-medium">{+data.rating}</p>
      </div>
    </div>
  );
}
