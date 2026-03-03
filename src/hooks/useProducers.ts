import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  getProducers,
  deleteProducer,
  updateProducer,
  addProducer,
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
    onError: () => {
      toast.error("Failed to delete producer");
    },
    onSuccess: () => toast.success("Producer deleted successfully!"),
    onSettled: () => queryClient.invalidateQueries({ queryKey }),
  });

  const updateProducerMutation = useMutation({
    mutationFn: ({ id, producer }: UpdateProducer) =>
      updateProducer(token, id, producer),

    onError: () => {
      toast.error("Failed to update producer");
    },

    onSuccess: () => {
      toast.success("Producer updated successfully!");
    },

    onSettled: () => queryClient.invalidateQueries({ queryKey }),
  });

  const addProducerMutation = useMutation({
    mutationFn: (producer: Partial<Producer>) => addProducer(token, producer),

    onSuccess: () => {
      toast.success("Producer added successfully!");
    },

    onSettled: () => queryClient.invalidateQueries({ queryKey }),
  });

  return {
    producers: producersQuery.data ?? [],
    isLoading: producersQuery.isFetching,
    error: producersQuery.error,

    removeProducer: removeProducerMutation.mutate,
    updateProducer: updateProducerMutation.mutate,
    addProducer: addProducerMutation.mutate,

    isAdding: addProducerMutation.isPending,
    isRemovingProducer: removeProducerMutation.isPending,
    isUpdatingProducer: updateProducerMutation.isPending,
  };
};
