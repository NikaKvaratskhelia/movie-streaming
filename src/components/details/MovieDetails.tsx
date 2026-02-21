"use client";

import { useMovieDetails } from "@/src/hooks/useMovieDetails";
import { useSeriesDetails } from "@/src/hooks/useSeriesDetail";
import { useParams } from "next/navigation";
import Image from "next/image";
import AddToWatchlist from "./AddToWatchlist";
import Loader from "../ui/Loader";
import { CalendarDays, History, Popcorn, Star } from "lucide-react";
import { useFormatDuration } from "@/src/hooks/useFormatDuration";
import Link from "next/link";
import { Actor } from "@/generated/prisma/browser";
import EpisodesSection from "./EpisodesSection";

export default function DetailsPage() {
  const params = useParams();

  const type = params?.type as "movie" | "series" | undefined;
  const id = params?.id ? Number(params.id) : null;

  const isMovie = type === "movie";

  const {
    movie,
    isLoading: movieLoading,
    error: movieError,
  } = useMovieDetails(isMovie ? id : null);

  const {
    series,
    isLoading: seriesLoading,
    error: seriesError,
  } = useSeriesDetails(!isMovie ? id : null);

  const data = isMovie ? movie : series;
  const isLoading = isMovie ? movieLoading : seriesLoading;
  const error = isMovie ? movieError : seriesError;

  const time = useFormatDuration(data?.duration);

  if (isLoading) return <Loader />;
  if (error) return <p>Error loading data</p>;
  if (!data) return <p>No data found</p>;

  return (
    <>
      <div className="text-white flex gap-8 w-full font-regular">
        <Image
          src={data.coverPhoto}
          alt={data.title}
          width={352}
          height={576}
          className="rounded-[10px] max-w-88 w-full aspect-352/576"
        />
        <div className="flex flex-col w-full">
          <div className="flex justify-between items-center gap-4">
            <h3 className="text-[34px] font-semibold text-nowrap select-none">
              {data.title}
            </h3>

            <AddToWatchlist type={type} id={id} />
          </div>

          <div className="mt-10 lg:mt-16 mb-5 flex flex-wrap gap-2 select-none">
            {data.genres.map((g: string, index: number) => (
              <div
                key={index}
                className="p-2.5 rounded-[10px] bg-white text-center font-semibold text-black"
              >
                {g}
              </div>
            ))}

            <div className="flex p-2.5 gap-2">
              <CalendarDays strokeWidth={1.5} />
              <p className="text-white">{data.yearPublished}</p>
            </div>

            <div className="flex p-2.5 gap-2">
              {isMovie ? (
                <>
                  <History /> {time}
                </>
              ) : (
                <>
                  <Popcorn />
                  {data.seasons.length} Seasons
                </>
              )}
            </div>

            <div className="flex gap-2 p-2.5">
              <Star fill="#ffffff" />
              {data.rating}
            </div>
          </div>

          <p>{data.description}</p>

          <div className="mt-10 flex flex-col gap-y-2">
            <div className="flex gap-3">
              <span className="w-25 text-right">Genre</span>
              <span>:</span>
              <span>{data.genres.join(", ")}</span>
            </div>

            <div className="flex gap-3">
              <span className="w-25 text-right">Date Released</span>
              <span>:</span>
              <span>{data.yearPublished}</span>
            </div>

            <div className="flex gap-3">
              <span className="w-25 text-right">Producer</span>
              <span>:</span>
              <Link href={`/producers/${data.producer.id}`}>
                {data.producer.fullName}
              </Link>
            </div>

            <div className="flex gap-3">
              <span className="w-25 text-right">Cast</span>
              <span>:</span>
              <span>
                {Array.isArray(data?.actors) && data.actors.length > 0
                  ? data.actors.map((actor: Actor, i: number) => (
                      <span key={actor.id}>
                        <Link href={`/actors/${actor.id}`}>
                          {actor.fullName}
                        </Link>
                        {i < data.actors.length - 1 && ", "}
                      </span>
                    ))
                  : "No actors available."}
              </span>
            </div>
          </div>
        </div>
      </div>
      {!isMovie && <EpisodesSection series={series} />}
    </>
  );
}
