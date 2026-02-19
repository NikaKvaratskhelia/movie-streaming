"use client";
import { Series } from "@/generated/prisma/browser";
import SeriesCard from "../shared/SeriesCard";
import LoadingSpinner from "../shared/LoadingSpinner";
import ErrorComponent from "../shared/ErrorComponent";
import NoData from "../shared/NoData";
import ViewAllLink from "../shared/ViewAllLink";
import { useSeriesStore } from "../../store/useSeriesStore";
import { useEffect } from "react";
import { useDataOnLoaded } from "../../hooks/useDataOnLoaded";

interface SeriesSectionProps {
  series?: Series[];
  limit: number;
  onLoaded?: () => void;
}

export default function NewReleaseSeries({
  series: propSeries,
  limit,
  onLoaded,
}: SeriesSectionProps) {
  const { series: storeSeries, loading, error, fetchSeries } = useSeriesStore();

  useEffect(() => {
    fetchSeries();
  }, [fetchSeries]);

  const series = propSeries || storeSeries;

  useDataOnLoaded({ data: series, loading, onLoaded });

  if (error) {
    return <ErrorComponent error={error} />;
  }

  if (series.length === 0) {
    return <NoData />;
  }

  return (
    <div className="w-full flex flex-col items-start">
      <div className="w-full lg:w-[75%] flex justify-between items-center px-4 lg:ml-[12%] lg:mr-[12%] mt-12 lg:mt-20 mb-6">
        <h2 className="text-xl lg:text-2xl font-semibold text-white">
          New Release - Series
        </h2>
        <ViewAllLink href="/series" />
      </div>
      <div className="w-full flex justify-center px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8.25">
          {series.slice(0, limit).map((seriesItem) => (
            <SeriesCard key={seriesItem.id} series={seriesItem} />
          ))}
        </div>
      </div>
    </div>
  );
}