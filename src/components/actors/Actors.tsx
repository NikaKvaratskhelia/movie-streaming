"use client";

import ActorCard from "../shared/ActorCard";
import { useActors } from "@/src/hooks/useActor";
import Loader from "../ui/Loader";
import { Actor } from "@/generated/prisma/browser";

export default function ActorGrid() {
  const { actors, isLoading } = useActors();

  if (isLoading) {
    return <Loader />;
  }

  if (actors.length === 0) {
    return (
      <div className="text-center py-12 lg:py-20">
        <h2 className="text-xl lg:text-2xl font-semibold text-white mb-3 lg:mb-4">
          No Actors Available
        </h2>
        <p className="text-gray-400 text-sm lg:text-base">
          Check back later for new actors.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center items-center gap-4 lg:gap-8">
      {actors.map((actor: Actor) => (
        <ActorCard key={actor.id} actor={actor} />
      ))}
    </div>
  );
}
