"use client";

import { Actor, Movie } from "@/generated/prisma/browser";
import { SeriesWithCount } from "@/src/types/SeriesWithCount";
import BackButton from "../shared/BackButton";
import ActorInfo from "./ActorInfo";
import ActorSeries from "./ActorSeries";
import ActorMovie from "./ActorMovie";

interface ActorDetailsLayoutProps {
  actor: Actor & {
    movies?: Movie[];
    series?: SeriesWithCount[];
  };
}

export default function ActorDetailsLayout({ actor }: ActorDetailsLayoutProps) {
  return (
    <div className="min-h-screen bg-black">
      <div className="w-full px-4 lg:px-[12%] pb-8 lg:pb-12 my-4 py-10">
        <div className="max-w-6xl mx-auto">
          <BackButton />
          
          <div className="flex flex-col lg:flex-row gap-8 mb-12">
            <ActorInfo actor={actor} />
          </div>
          
          <div className="space-y-12">
            <ActorMovie movies={actor.movies} />
            <ActorSeries series={actor.series} />
          </div>
        </div>
      </div>
    </div>
  );
}
