import { Series } from "@/generated/prisma/browser";
import SeriesCard from "@/src/components/shared/SeriesCard";

interface SeriesGridProps {
  series: Series[];
}

export default function SeriesGrid({ series }: SeriesGridProps) {
  if (series.length === 0) {
    return (
      <div className="text-center py-12 lg:py-20">
        <h2 className="text-xl lg:text-2xl font-semibold text-white mb-3 lg:mb-4">
          No Series Available
        </h2>
        <p className="text-gray-400 text-sm lg:text-base">
          Check back later for new series releases.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center items-center gap-4 lg:gap-8">
      {series.map((item) => (
        <SeriesCard key={item.id} series={item} />
      ))}
    </div>
  );
}
