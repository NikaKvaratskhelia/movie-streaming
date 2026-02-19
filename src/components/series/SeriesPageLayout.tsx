"use client";

import { useState } from "react";
import { Series } from "@/generated/prisma/browser";
import SeriesHeader from "./SeriesHeader";
import SeriesGrid from "./Series";

interface SeriesPageLayoutProps {
  series: Series[];
  isLoading: boolean;
  error: any;
}

export default function SeriesPageLayout({ 
  series, 
  isLoading, 
  error 
}: SeriesPageLayoutProps) {
  const [filteredSeries, setFilteredSeries] = useState<Series[]>(series);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Error Loading Series</h2>
          <p className="text-gray-400">Failed to load series. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <SeriesHeader 
        series={series} 
        onFilteredSeries={setFilteredSeries} 
      />
      
      <div className="w-full px-4 lg:px-[12%] pb-12">
        <div className="max-w-7xl mx-auto">
          <SeriesGrid series={filteredSeries} />
        </div>
      </div>
    </div>
  );
}
