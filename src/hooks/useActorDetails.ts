import { useQuery } from "@tanstack/react-query";
import { Actor } from "@/generated/prisma/browser";
import { fetchActorById } from "@/src/services/actor-service";

export const useActorDetails = (actorId: number) => {
  const queryKey = ["actor", actorId];

  const actorQuery = useQuery({
    queryKey,
    queryFn: async () => {
      const resp = await fetchActorById(actorId);
      return resp as Actor;
    },
    enabled: !!actorId,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  return {
    actor: actorQuery.data,
    isLoading: actorQuery.isLoading,
    error: actorQuery.error,
  };
};
