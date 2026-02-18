"use client";
import { Series } from "@/generated/prisma/browser";
import SeriesCard from "../shared/SeriesCard";
import LoadingSpinner from "../shared/LoadingSpinner";
import ErrorComponent from "../shared/ErrorComponent";
import NoData from "../shared/NoData";
import { useSeriesStore } from "../../store/useSeriesStore";
import { useEffect } from "react";

interface SeriesSectionProps {
  series?: Series[];
  limit: number;
}

export default function NewReleaseSeries({
  series: propSeries,
  limit,
}: SeriesSectionProps) {
  const { series: storeSeries, loading, error, fetchSeries } = useSeriesStore();

  useEffect(() => {
    fetchSeries();
  }, [fetchSeries]);

  const series = propSeries || storeSeries;

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorComponent error={error} />;
  }

  if (series.length === 0) {
    return <NoData />;
  }

  return (
    <div className="w-full flex flex-col items-start">
      <h2 className="ml-[12%] mt-20 mb-6 text-2xl font-semibold text-white">
        New Release - Series
      </h2>
      <div className="w-full flex justify-center">
        <div className="flex gap-8.25">
          {series.slice(0, limit).map((seriesItem) => (
            <SeriesCard key={seriesItem.id} series={seriesItem} />
          ))}
        </div>
      </div>
    </div>
  );
}