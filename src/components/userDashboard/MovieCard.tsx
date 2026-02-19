"use client";

import { Movie, Series } from "@/generated/prisma/browser";
import { fetchMovieById } from "@/src/services/movie-services";
import { fetchSeriesById } from "@/src/services/seriesService";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useWatchlist } from "@/src/hooks/useWatchlist";
import { useAuthStore } from "@/src/store/useLoginStore";
import Loader from "../ui/Loader";

export default function MovieCard({
  id,
  type,
}: {
  id: number;
  type: "MOVIE" | "SERIES";
}) {
  const [moviesData, setMoviesData] = useState<Movie | Series>();
  const { token } = useAuthStore();
  const { removeMovie, removeSeries } = useWatchlist(token!);
  const [loading, setLoading] = useState(false);

  function deleteMovie() {
    removeMovie(id);
  }

  function deleteSeries() {
    removeSeries(id);
  }

  function handleClick() {
    if (type === "MOVIE") {
      deleteMovie();
    } else {
      deleteSeries();
    }
  }

  useEffect(() => {
    async function handleMovieFetch() {
      setLoading(true);
      const res = await fetchMovieById(id);
      setMoviesData(res.data);
      setLoading(false);
    }

    async function handleSeriesFetch() {
      setLoading(true);
      const res = await fetchSeriesById(id);
      setMoviesData(res.data);
      setLoading(false);
    }
    if (type === "MOVIE") {
      handleMovieFetch();
    } else {
      handleSeriesFetch();
    }
  }, [id, type]);

  const href = type === "MOVIE" ? `/movies/${id}` : "/series/${id}";

  if (!moviesData) return null;

  if (loading) {
    <Loader loadingProp={loading} />;
  }

  return (
    <div
      className="flex flex-col w-fit rounded-2xl border border-white/40 overflow-hidden 
      transition-all duration-500 hover:border-red-600 hover:-translate-y-2 group"
    >
      <div className="relative">
        <div className="absolute inset-0 transition-all duration-500 group-hover:bg-linear-to-t group-hover:from-black/80 group-hover:from-0% group-hover:to-transparent group-hover:to-60% z-1"></div>
        <div className="absolute top-2 left-2 px-2 py-1 border-bg-600 border text-red-600 bg-black/90 rounded-md text-[10px] font-bold tracking-widest">{type}</div>
        <Image
          src={moviesData.coverPhoto}
          alt={moviesData.title}
          width={220}
          height={250}
        />

        <div
          className="opacity-0 z-2 group-hover:opacity-100 absolute bottom-2 left-2 py-2 px-2.5 bg-[#e05a5ad9] w-fit rounded-md text-[11px] transition-all duration-500 font-bold cursor-pointer"
          onClick={handleClick}
        >
          ✕ Remove
        </div>
      </div>
      <Link href={href} className="p-3">
        <h2 className="text-[#e8e6f0] text-[13px]">{moviesData.title}</h2>
        <div className="flex gap-2 items-center text-red-600 font-bold text-[11px]">
          <p className="flex items-center gap-1">
            ★ <span>{Number(moviesData.rating) || 0}</span>
          </p>
          <p className="font-medium text-white/60">
            {moviesData.yearPublished}
          </p>
        </div>
      </Link>
    </div>
  );
}
