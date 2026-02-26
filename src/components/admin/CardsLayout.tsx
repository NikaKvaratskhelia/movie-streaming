"use client";

import { useMovies } from "@/src/hooks/useMovie";
import { useSeries } from "@/src/hooks/useSeries";
import AdminCard from "./AdminCard";
import { useProducers } from "@/src/hooks/useProducers";
import Loader from "../ui/Loader";

export default function CardsLayout() {
  const { movies, isLoading: loading1 } = useMovies();
  const { series, isLoading: loading2 } = useSeries();
  const { producers, isLoading: loading3 } = useProducers();

  const isLoading = loading1 || loading2 || loading3;

  if (isLoading) return <Loader />;
  return (
    <div className="flex gap-6 flex-wrap items-center justify-between mt-4">
      <AdminCard text="Movies" count={movies.length.toString()} />
      <AdminCard text="Series" count={series.length.toString()} />
      <AdminCard text="Users" count={producers.length.toString()} />
    </div>
  );
} 
