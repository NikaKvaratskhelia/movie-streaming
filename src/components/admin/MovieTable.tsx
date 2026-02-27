"use client"
import { useMovies } from "@/src/hooks/useMovie";
import Loader from "../ui/Loader";
import { DynamicTable } from "./Table";

export default function MovieTable() {
  const { movies, isLoading, removeMovie } = useMovies();

  if (isLoading) return <Loader />;
  return (
    <DynamicTable
      data={movies ?? []}
      hiddenKeys={["coverPhoto", "id", "duration", "producerId", "genres"]}
      onDelete={(id) => removeMovie(id as number)}
    />
  );
}
