import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Actor } from "@/generated/prisma/browser";
import {
  fetchActors,
  deleteActor,
  addActor,
  updateActor,
} from "@/src/services/actor-service";
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
    onSettled: () => queryClient.invalidateQueries({ queryKey }),
    onSuccess: () => toast.success("Actor deleted successfully!"),
  });

  const addActorMutation = useMutation({
    mutationFn: (data: Partial<Actor>) => addActor(token, data),
    onSettled: () => queryClient.invalidateQueries({ queryKey }),
    onSuccess: () => toast.success("Actor added successfully!"),
  });

  const updateActorMutation = useMutation({
    mutationFn: ({ data, id }: { data: Partial<Actor>; id: number }) =>
      updateActor(token, data, id),
    onSettled: () => queryClient.invalidateQueries({ queryKey }),
    onSuccess: () => toast.success("Actor added successfully!"),
  });

  return {
    actors: actorsQuery.data ?? [],
    isLoading: actorsQuery.isLoading,
    error: actorsQuery.error,

    removeActor: removeActorMutation.mutate,
    isRemovingActor: removeActorMutation.isPending,

    addActor: addActorMutation.mutate,
    isAddingActor: addActorMutation.isPending,

    updateActor: updateActorMutation.mutate,
    isUpdatingActor: updateActorMutation.isPending,
  };
};
