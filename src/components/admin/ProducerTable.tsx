"use client";

import { useProducers } from "@/src/hooks/useProducers";
import { DynamicTable } from "./Table";
import Loader from "../ui/Loader";

export default function ProducerTable() {
  const { producers, isLoading, removeProducer } = useProducers();

  if (isLoading) return <Loader />;

  return (
    <DynamicTable
      data={producers}
      hiddenKeys={["dateOfBirth", "id"]}
      onDelete={(id) => removeProducer(id as number)}
    />
  );
}
