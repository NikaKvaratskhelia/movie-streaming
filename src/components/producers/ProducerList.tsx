"use client";

import { Producer } from "@/generated/prisma/browser";
import ProducerCard from "@/src/components/shared/ProducerCard";

interface ProducerListProps {
  producers: Producer[];
}

export default function ProducerList({ producers }: ProducerListProps) {
  if (producers.length === 0) {
    return <div className="text-xl text-gray-400">No producers found</div>;
  }

  return (
    <div className="flex flex-wrap justify-center gap-6">
      {producers.map((producer) => (
        <ProducerCard key={producer.id} producer={producer} />
      ))}
    </div>
  );
}
