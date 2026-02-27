"use client";
import { useActors } from "@/src/hooks/useActor";
import { DynamicTable } from "./Table";
import Loader from "../ui/Loader";

export default function ActorsTable() {
  const { actors, isLoading, removeActor } = useActors();
  if (isLoading) return <Loader />;

  return (
    <DynamicTable
      data={actors}
      hiddenKeys={["id", "dateOfBirth"]}
      onDelete={(id) => removeActor(id as number)}
    />
  );
}
