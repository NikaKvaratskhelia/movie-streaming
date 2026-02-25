import SeriesCard from "@/src/components/shared/SeriesCard";
import { SeriesWithCount } from "@/src/types/SeriesWithCount";

interface SeriesListProps {
  series: SeriesWithCount[];
}

export default function SeriesList({ series }: SeriesListProps) {
  if (series.length === 0) {
    return (
      <div className="text-gray-400 text-lg text-center">No series found for this producer</div>
    );
  }

  return (
    <div className="flex justify-center items-center flex-wrap gap-6">

      {series.map((seriesItem) => (
        <SeriesCard key={seriesItem.id} series={seriesItem} />
      ))}
    </div>
  );
}
