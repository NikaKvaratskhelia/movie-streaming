import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Series } from "@/generated/prisma/browser";
import {
  fetchSeries,
  deleteSeries,
  addSeries,
  updateSeries,
} from "@/src/services/seriesService";

export const useSeries = () => {
  const queryClient = useQueryClient();
  const queryKey = ["series"];

  const seriesQuery = useQuery({
    queryKey,
    queryFn: async () => {
      const resp = await fetchSeries();
      return resp.data as Series[];
    },
  });

  const addSeriesMutation = useMutation({
    mutationFn: (series: Series) => addSeries(series),
    onMutate: async (newSeries) => {
      await queryClient.cancelQueries({ queryKey });
      const previous = queryClient.getQueryData<Series[]>(queryKey);
      queryClient.setQueryData<Series[]>(queryKey, (old = []) => [
        ...old,
        newSeries,
      ]);
      return { previous };
    },
    onError: (_err, _series, context) => {
      if (context?.previous) {
        queryClient.setQueryData(queryKey, context.previous);
      }
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey }),
  });

  const removeSeriesMutation = useMutation({
    mutationFn: (id: number) => deleteSeries(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey });
      const previous = queryClient.getQueryData<Series[]>(queryKey);
      queryClient.setQueryData<Series[]>(queryKey, (old = []) =>
        old.filter((s) => s.id !== id),
      );
      return { previous };
    },
    onError: (_err, _id, context) => {
      if (context?.previous) {
        queryClient.setQueryData(queryKey, context.previous);
      }
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey }),
  });

  const updateSeriesMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Series> }) =>
      updateSeries(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey });
      const previous = queryClient.getQueryData<Series[]>(queryKey);
      queryClient.setQueryData<Series[]>(queryKey, (old = []) =>
        old.map((s) => (s.id === id ? { ...s, ...data } : s)),
      );
      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(queryKey, context.previous);
      }
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey }),
  });

  return {
    series: seriesQuery.data ?? [],
    isLoading: seriesQuery.isLoading,
    error: seriesQuery.error,
    addSeries: addSeriesMutation.mutateAsync,
    removeSeries: removeSeriesMutation.mutate,
    updateSeries: updateSeriesMutation.mutate,
    isAddingSeries: addSeriesMutation.isPending,
    isRemovingSeries: removeSeriesMutation.isPending,
    isUpdatingSeries: updateSeriesMutation.isPending,
  };
};
