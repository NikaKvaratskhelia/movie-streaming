import { useQuery } from "@tanstack/react-query";
import { fetchMovieById } from "@/src/services/movie-services";

export const useMovieDetails = (id: number | null) => {
  const queryKey = ["movie", id];

  const moviesQuery = useQuery({
    queryKey,
    queryFn: async ({ queryKey }) => {
      const [, movieId] = queryKey as [string, number];
      const resp = await fetchMovieById(movieId);
      return resp.data;
    },
    enabled: !!id,
  });

  return {
    movie: moviesQuery.data ?? null,
    isLoading: moviesQuery.isLoading,
    error: moviesQuery.error,
  };
};
