import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  getProducers,
  deleteProducer,
  updateProducer,
} from "../services/producer-service";
import { useAuthStore } from "../store/useLoginStore";
import type { Producer } from "@/generated/prisma/browser";

type UpdateProducer = {
  id: number;
  producer: Partial<Producer>;
};

export const useProducers = () => {
  const queryClient = useQueryClient();
  const queryKey = ["producers"] as const;
  const { token } = useAuthStore();

  const producersQuery = useQuery({
    queryKey,
    queryFn: async () => {
      const resp = await getProducers();
      const data = resp as Producer[];
      return [...data].sort((a, b) => a.id - b.id);
    },
    staleTime: 1000 * 60 * 5,
  });

  const removeProducerMutation = useMutation({
    mutationFn: (id: number) => deleteProducer(token, id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey });
      const previous = queryClient.getQueryData<Producer[]>(queryKey);

      queryClient.setQueryData<Producer[]>(queryKey, (old = []) =>
        old.filter((p) => p.id !== id),
      );

      return { previous };
    },
    onError: (_err, _id, ctx) => {
      if (ctx?.previous) queryClient.setQueryData(queryKey, ctx.previous);
      toast.error("Failed to delete producer");
    },
    onSuccess: () => toast.success("Producer deleted successfully!"),
    onSettled: () => queryClient.invalidateQueries({ queryKey }),
  });

  const updateProducerMutation = useMutation({
    mutationFn: ({ id, producer }: UpdateProducer) =>
      updateProducer(token, id, producer),

    onMutate: async ({ id, producer }) => {
      await queryClient.cancelQueries({ queryKey });
      const previous = queryClient.getQueryData<Producer[]>(queryKey);

      queryClient.setQueryData<Producer[]>(queryKey, (old = []) =>
        old.map((p) => (p.id === id ? { ...p, ...producer } : p)),
      );

      return { previous };
    },

    onError: (_err, _vars, ctx) => {
      if (ctx?.previous) queryClient.setQueryData(queryKey, ctx.previous);
      toast.error("Failed to update producer");
    },

    onSuccess: (saved) => {
      queryClient.setQueryData<Producer[]>(queryKey, (old = []) =>
        old.map((p) => (p.id === saved.id ? saved : p)),
      );
      toast.success("Producer updated successfully!");
    },

    onSettled: () => queryClient.invalidateQueries({ queryKey }),
  });

  return {
    producers: producersQuery.data ?? [],
    isLoading: producersQuery.isFetching,
    error: producersQuery.error,

    removeProducer: removeProducerMutation.mutate,
    updateProducer: updateProducerMutation.mutate,

    isRemovingProducer: removeProducerMutation.isPending,
    isUpdatingProducer: updateProducerMutation.isPending,
  };
};
