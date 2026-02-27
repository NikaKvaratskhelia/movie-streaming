import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getProducers, deleteProducer } from "../services/producer-service";
import { useAuthStore } from "../store/useLoginStore";
import { Producer } from "@/generated/prisma/browser";

export async function updateProducer(token: string | null, producer: Producer) {
  const res = await fetch("/api/producer", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(producer),
  });

  if (!res.ok) throw new Error("Failed to update producer");

  const data = await res.json();
  if (!data.ok) throw new Error(data.message);

  return data.producer;
}

export const useProducers = () => {
  const queryClient = useQueryClient();
  const queryKey = ["producers"];

  const { token } = useAuthStore();

  const producersQuery = useQuery({
    queryKey,
    queryFn: async () => {
      const resp = await getProducers();
      return resp;
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
    onError: (_err, _id, context) => {
      if (context?.previous)
        queryClient.setQueryData(queryKey, context.previous);
      toast.error("Failed to delete producer");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
    onSuccess: () => toast.success("Producer deleted successfully!"),
  });

  const updateProducerMutation = useMutation({
    mutationFn: (producer: Producer) => updateProducer(token, producer),
    onMutate: async (updatedProducer) => {
      await queryClient.cancelQueries({ queryKey });
      const previous = queryClient.getQueryData<Producer[]>(queryKey);
      queryClient.setQueryData<Producer[]>(queryKey, (old = []) =>
        old.map((p) => (p.id === updatedProducer.id ? updatedProducer : p)),
      );
      return { previous };
    },
    onError: (_err, _producer, context) => {
      if (context?.previous)
        queryClient.setQueryData(queryKey, context.previous);
      toast.error("Failed to update producer");
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey }),
    onSuccess: () => toast.success("Producer updated successfully!"),
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
