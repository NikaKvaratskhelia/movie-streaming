"use client";

import { useActors } from "@/src/hooks/useActor";
import ActorPageLayout from "@/src/components/actors/ActorPageLayout";
import Loader from "@/src/components/ui/Loader";

export default function ActorsPage() {
  const { actors, isLoading } = useActors();
  if (isLoading) {
    return <Loader />;
  }
  return (
    <ActorPageLayout actors={actors} isLoading={isLoading} />
  );
}
