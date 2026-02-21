"use client";
import { Series } from "@/generated/prisma/browser";
import SeriesCard from "../shared/SeriesCard";
import ViewAllLink from "../shared/ViewAllLink";
import { useSeries } from "@/src/hooks/useSeries";

interface SeriesSectionProps {
  series?: Series[];
  limit: number;
  onLoaded?: () => void;
}

export default function NewReleaseSeries({
  series: propSeries,
  limit,
}: SeriesSectionProps) {
  const { series: storeSeries } = useSeries();

  const series = propSeries || storeSeries;

  return (
    <div className="w-full flex flex-col items-start">
      <div className="w-full flex justify-between items-center px-8 mt-12 lg:mt-20 mb-6">
        <h2 className="text-xl lg:text-2xl font-semibold text-white">
          New Release - Series
        </h2>
        <ViewAllLink href="/series" />
      </div>
      <div className="w-full flex justify-center px-4">
        <div className="flex flex-wrap gap-8">
          {series.slice(0, limit).map((seriesItem) => (
            <SeriesCard key={seriesItem.id} series={seriesItem} />
          ))}
        </div>
      </div>
    </div>
  );
}
