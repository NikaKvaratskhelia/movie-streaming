"use client";

import { useMovies } from "@/src/hooks/useMovie";
import { useSeries } from "@/src/hooks/useSeries";
import AdminCard from "./AdminCard";
import { useProducers } from "@/src/hooks/useProducers";
import Loader from "../ui/Loader";
// import { useActors } from "@/src/hooks/useActors";

export default function CardsLayout() {
  const { movies, isLoading: loading1 } = useMovies();
  const { series, isLoading: loading2 } = useSeries();
  const { data: producers, isLoading: loading3 } = useProducers();

  const isLoading = loading1 || loading2 || loading3;
  //   const { actors, isLoading: loading4 } = useActors();

  if (isLoading) return <Loader />;
  return (
    <div className="flex flex-wrap justify-between gap-5 items-center max-w-300 mx-auto my-30">
      <AdminCard
        text="Movies"
        count={movies.length.toString()}
        href="/movies"
        addHref="/admin/add-movie"
      />
      <AdminCard
        text="Series"
        count={series.length.toString()}
        href="/series"
        addHref="/admin/add-series"
      />
      <AdminCard
        text="Producers"
        count={producers.length.toString()}
        href="/producers"
        addHref="/admin/add-producers"
      />
      <AdminCard
        text="Actors"
        // es unda gadavaketo actorze roa query ikneba
        count={producers.length.toString()}
        href="/actors"
        addHref="/admin/add-actors"
      />
    </div>
  );
}
