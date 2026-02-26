import SeriesCard from "@/src/components/shared/SeriesCard";
import { SeriesWithCount } from "@/src/types/SeriesWithCount";

interface ActorSeriesProps {
  series?: SeriesWithCount[];
}

export default function ActorSeries({ series }: ActorSeriesProps) {
  return (
    <div className="text-white">
      <h2 className="text-2xl font-bold mb-6 text-center">Series</h2>
      
      {!series || series.length === 0 ? (
        <p className="text-gray-400 text-center">No series found</p>
      ) : (
        <div className="flex flex-wrap justify-center gap-6">
          {series.map((seriesItem) => (
            <SeriesCard key={seriesItem.id} series={seriesItem} />
          ))}
        </div>
      )}
    </div>
  );
}
