import { Series } from "@/generated/prisma/browser";
import SeriesCard from "@/src/components/shared/SeriesCard";

interface SeriesGridProps {
  series: Series[];
}

export default function SeriesGrid({ series }: SeriesGridProps) {
  if (series.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold text-white mb-4">
          No Series Available
        </h2>
        <p className="text-gray-400">
          Check back later for new series releases.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-[32px]">
      {series.map((item) => (
        <SeriesCard key={item.id} series={item} />
      ))}
    </div>
  );
}
