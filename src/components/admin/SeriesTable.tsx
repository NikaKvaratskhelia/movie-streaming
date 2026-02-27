"use client";
import { useSeries } from "@/src/hooks/useSeries";
import { DynamicTable } from "./Table";
import Loader from "../ui/Loader";

export default function SeriesTable() {
  const { series, isLoading, removeSeries } = useSeries();

  if (isLoading) return <Loader />;

  return (
    <DynamicTable
      data={series}
      onDelete={(id) => removeSeries(id as number)}
      hiddenKeys={[
        "id",
        "description",
        "coverPhoto",
        "isSeries",
        "createdAt",
        "updatedAt",
      ]}
    />
  );
}
