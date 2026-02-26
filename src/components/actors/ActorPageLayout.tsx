"use client";

import { useState, useEffect } from "react";
import { Actor } from "@/generated/prisma/browser";

import Actors from "./Actors";

interface ActorPageLayoutProps {
  actors: Actor[];
  isLoading: boolean;
}

export default function ActorPageLayout({
  actors,
  isLoading,
}: ActorPageLayoutProps) {
  const [filteredActors, setFilteredActors] = useState<Actor[]>(actors);

  useEffect(() => {
    setFilteredActors(actors);
  }, [actors]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-black">


      <div className="w-full px-4 lg:px-[12%] pb-8 lg:pb-12 my-4 py-10">
        <div className="w-full mx-auto">
          <Actors actors={filteredActors} />
        </div>
      </div>
    </div>
  );
}
