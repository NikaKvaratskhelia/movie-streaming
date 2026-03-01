"use client";

import { useMovies } from "@/src/hooks/useMovie";
import { useSeries } from "@/src/hooks/useSeries";
import AdminCard from "./AdminCard";
import Loader from "../ui/Loader";
import { useAdminUsers } from "@/src/hooks/useAdminUsers";

export default function CardsLayout() {
  const { movies, isLoading: loading1 } = useMovies();
  const { series, isLoading: loading2 } = useSeries();
  const { users, loading } = useAdminUsers();

  const isLoading = loading1 || loading2 || loading;

  if (isLoading) return <Loader />;
  return (
    <div className="flex justify-between gap-5 items-center max-w-300 mx-auto my-30">
      <AdminCard text="Movies" count={movies.length.toString()} />
      <AdminCard text="Series" count={series.length.toString()} />
      <AdminCard text="Users" count={users.length.toString()} />
    </div>
  );
}
