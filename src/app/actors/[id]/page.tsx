"use client";

import { useParams } from "next/navigation";
import { useActorDetails } from "@/src/hooks/useActorDetails";
import ActorDetailsLayout from "@/src/components/actors/ActorDetailsLayout";
import Loader from "@/src/components/ui/Loader";
import ActorError from "@/src/components/actors/ActorError";

export default function ActorDetailsPage() {
  const params = useParams();
  const actorId = parseInt(params.id as string);

  const { actor, isLoading, error } = useActorDetails(actorId);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <ActorError type="error" />;
  }

  if (!actor) {
    return <ActorError type="not-found" />;
  }

  return <ActorDetailsLayout actor={actor} />;
}
