"use client";

import { useProducerDetails } from "@/src/services/useProducerDetails";
import ErrorDisplay from "./ErrorDisplay";
import ProducerInfo from "./ProducerInfo";
import MovieList from "./MovieList";
import SeriesList from "./SeriesList";
import { Loader } from "lucide-react";

export default function ProducerDetails({ id }: { id: string }) {
  const { data: producer, error, isLoading } = useProducerDetails(id);

  if (isLoading) return <Loader />;

  if (error) {
    return <ErrorDisplay error={error.message} />;
  }

  if (!producer) {
    return <div className="text-white text-xl">Producer not found</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white pt-24 px-4">
      <div className="max-w-7xl mx-auto">
        <ProducerInfo producer={producer} />

        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Movies</h2>
          <MovieList movies={producer.movies} />
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-6 text-center">Series</h2>
          <SeriesList series={producer.series} />
        </div>
      </div>
    </div>
  );
}
