"use client";
import NewMovieCard from "./NewMovieCard";
import { ReactNode, useMemo } from "react";
import { useMovies } from "@/src/hooks/useMovie";
import { useSeries } from "@/src/hooks/useSeries";
import { SeriesWithCount } from "@/src/types/SeriesWithCount";

type MovieLayoutProps = {
  icon: ReactNode;
  text: string;
  type: "movie";
};

type SeriesLayoutProps = {
  icon: ReactNode;
  text: string;
  type: "series";
};

type Props = MovieLayoutProps | SeriesLayoutProps;

export default function LatestMoviesLayout({ icon, text, type }: Props) {
  const { movies } = useMovies();
  const { series } = useSeries();

  const sortedMovies = useMemo(() => {
    return [...movies]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
      .slice(0, 5);
  }, [movies]);

  const sortedSeries = useMemo(() => {
    return [...series]
      .sort(
        (a: SeriesWithCount, b: SeriesWithCount) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
      .slice(0, 5);
  }, [series]);

  return (
    <div className="flex flex-col gap-4 bg-[#14161c] p-6 rounded-2xl">
      <div className="flex items-center gap-2">
        <div className="text-red-700">{icon}</div>
        <p className="font-semibold text-lg">{text}</p>
      </div>
      <div className="flex flex-col gap-3">
        {type === "movie"
          ? sortedMovies.map((item) => (
              <NewMovieCard key={item.id} type="movie" data={item} />
            ))
          : sortedSeries.map((item: SeriesWithCount) => (
              <NewMovieCard key={item.id} type="series" data={item} />
            ))}
      </div>
    </div>
  );
}
