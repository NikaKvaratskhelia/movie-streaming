import { useQuery } from "@tanstack/react-query";
import { fetchSeriesById } from "@/src/services/seriesService";

export const useSeriesDetails = (id: number | null) => {
  const queryKey = ["series", id];

  const seriesQuery = useQuery({
    queryKey,
    queryFn: async () => {
      const resp = await fetchSeriesById(id);
      return resp.data;
    },
    enabled: !!id,
  });

  return {
    series: seriesQuery.data ?? null,
    isLoading: seriesQuery.isFetching,
    error: seriesQuery.error,
  };
};
