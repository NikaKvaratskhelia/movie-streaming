"use client";

import { useSeries } from "@/src/hooks/useSeries";
import SeriesPageLayout from "@/src/components/series/SeriesPageLayout";

export default function SeriesPage() {
  const { series, isLoading, error } = useSeries();

  return (
    <SeriesPageLayout 
      series={series} 
      isLoading={isLoading} 
      error={error} 
    />
  );
}
