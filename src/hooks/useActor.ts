import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Actor } from "@/generated/prisma/browser";
import { fetchActors, deleteActor } from "@/src/services/actor-service";
import { useAuthStore } from "../store/useLoginStore";

export const useActors = () => {
  const queryClient = useQueryClient();
  const queryKey = ["actors"];

  const { token } = useAuthStore();

  const actorsQuery = useQuery({
    queryKey,
    queryFn: async () => {
      const resp = await fetchActors();
      return resp as Actor[];
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const removeActorMutation = useMutation({
    mutationFn: (id: number) => deleteActor(token, id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey });
      const previous = queryClient.getQueryData<Actor[]>(queryKey);

      queryClient.setQueryData<Actor[]>(queryKey, (old = []) =>
        old.filter((actor) => actor.id !== id),
      );

      return { previous };
    },
    onError: (_err, _id, context) => {
      if (context?.previous)
        queryClient.setQueryData(queryKey, context.previous);
      toast.error("Failed to delete actor");
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey }),
    onSuccess: () => toast.success("Actor deleted successfully!"),
  });

  return {
    actors: actorsQuery.data ?? [],
    isLoading: actorsQuery.isLoading,
    error: actorsQuery.error,
    removeActor: removeActorMutation.mutate,
    isRemovingActor: removeActorMutation.isPending,
  };
};
