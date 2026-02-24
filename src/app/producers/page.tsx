"use client";

import { useProducers } from "@/src/hooks/useProducers";
import ProducerList from "@/src/components/producers/ProducerList";
import ErrorDisplay from "../../components/producers/ErrorDisplay";

export default function ProducersPage() {
  const { producers, error } = useProducers();

  if (error) {
    return <ErrorDisplay error={error} />;
  }

  return (
    <div className="min-h-screen bg-black text-white pt-24 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Producers</h1>
        <ProducerList producers={producers} />
      </div>
    </div>
  );
}
