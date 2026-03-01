"use client";

import { useProducers } from "@/src/hooks/useProducers";
import ProducerList from "@/src/components/producers/ProducerList";
import { Loader } from "lucide-react";
import ErrorDisplay from "@/src/components/producers/ErrorDisplay";

export default function ProducersPage() {
  const { producers, error, isLoading } = useProducers();

  if (isLoading) return <Loader />;

  if (error) {
    return <ErrorDisplay error={error.message} />;
  }

  if (!producers) return null;

  return (
    <div className="min-h-screen bg-black text-white pt-24 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Producers</h1>
        <ProducerList producers={producers} />
      </div>
    </div>
  );
}
