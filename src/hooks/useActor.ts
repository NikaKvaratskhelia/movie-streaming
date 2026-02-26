import { useQuery } from "@tanstack/react-query";
import { Actor } from "@/generated/prisma/browser";
import { fetchActors } from "@/src/services/actor-service";

export const useActors = () => {
  const queryKey = ["actors"];

  const actorsQuery = useQuery({
    queryKey,
    queryFn: async () => {
      const resp = await fetchActors();
      return resp as Actor[];
    },
    staleTime: 1000 * 60 * 5, 
    refetchOnWindowFocus: false,
  });

  return {
    actors: actorsQuery.data ?? [],
    isLoading: actorsQuery.isLoading,
    error: actorsQuery.error,
  };
};
