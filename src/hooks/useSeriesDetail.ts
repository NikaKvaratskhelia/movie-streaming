import { useQuery } from "@tanstack/react-query";
import { fetchSeriesById } from "@/src/services/seriesService";

export const useSeriesDetails = (id: number | null) => {
  const queryKey = ["series", id];

  const seriesQuery = useQuery({
    queryKey,
    queryFn: async ({ queryKey }) => {
      const [, movieId] = queryKey as [string, number];
      const resp = await fetchSeriesById(movieId);
      return resp.data;
    },
    enabled: !!id,
  });

  return {
    series: seriesQuery.data ?? null,
    isLoading: seriesQuery.isLoading,
    error: seriesQuery.error,
  };
};
