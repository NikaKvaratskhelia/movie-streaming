import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addMovieToWatchist,
  addSerieToWatchist,
  getWatchlists,
  removeMovieFromWatchist,
  removeSerieFromWatchist,
} from "../services/watchlist-service";
import { MovieWatchlist, SeriesWatchlist } from "@/generated/prisma/browser";

interface WatchlistsResponse {
  movieWatchlists: MovieWatchlist[];
  seriesWatchlists: SeriesWatchlist[];
}

export const useWatchlist = (token: string) => {
  const queryClient = useQueryClient();

  const watchlistsQuery = useQuery({
    queryKey: ["watchlists", token],
    queryFn: async (): Promise<WatchlistsResponse> => {
      const res = await getWatchlists(token);

      if (!res.ok) {
        throw new Error(res.message);
      }

      return {
        movieWatchlists: res.data.movieWatchlists ?? [],
        seriesWatchlists: res.data.seriesWatchlists ?? [],
      };
    },
    enabled: !!token,
  });

  const optimisticUpdate = async (
    updater: (old: WatchlistsResponse) => WatchlistsResponse,
  ) => {
    await queryClient.cancelQueries({ queryKey: ["watchlists", token] });

    const previous = queryClient.getQueryData<WatchlistsResponse>([
      "watchlists",
      token,
    ]);

    if (previous) {
      queryClient.setQueryData(["watchlists", token], updater(previous));
    }

    return { previous };
  };

  const rollback = (
    context: { previous: WatchlistsResponse | undefined } | undefined,
  ) => {
    if (context?.previous) {
      queryClient.setQueryData(["watchlists", token], context.previous);
    }
  };

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["watchlists", token] });
  };

  const addMovie = useMutation({
    mutationFn: (id: number) => addMovieToWatchist(token, id),

    onMutate: async (id) => {
      return optimisticUpdate((old) => ({
        ...old,
        movieWatchlists: [...old.movieWatchlists, { id } as MovieWatchlist],
      }));
    },

    onError: (_err, _id, context) => {
      rollback(context);
    },

    onSettled: invalidate,
  });

  const removeMovie = useMutation({
    mutationFn: (id: number) => removeMovieFromWatchist(token, id),

    onMutate: async (id) => {
      return optimisticUpdate((old) => ({
        ...old,
        movieWatchlists: old.movieWatchlists.filter((m) => m.id !== id),
      }));
    },

    onError: (_err, _id, context) => {
      rollback(context);
    },

    onSettled: invalidate,
  });

  const addSeries = useMutation({
    mutationFn: (id: number) => addSerieToWatchist(token, id),

    onMutate: async (id) => {
      return optimisticUpdate((old) => ({
        ...old,
        seriesWatchlists: [...old.seriesWatchlists, { id } as SeriesWatchlist],
      }));
    },

    onError: (_err, _id, context) => {
      rollback(context);
    },

    onSettled: invalidate,
  });

  const removeSeries = useMutation({
    mutationFn: (id: number) => removeSerieFromWatchist(token, id),

    onMutate: async (id) => {
      return optimisticUpdate((old) => ({
        ...old,
        seriesWatchlists: old.seriesWatchlists.filter((s) => s.id !== id),
      }));
    },

    onError: (_err, _id, context) => {
      rollback(context);
    },

    onSettled: invalidate,
  });

  return {
    movieWatchlist: watchlistsQuery.data?.movieWatchlists ?? [],
    seriesWatchlist: watchlistsQuery.data?.seriesWatchlists ?? [],
    isLoading: watchlistsQuery.isLoading,
    error: watchlistsQuery.error,

    addMovie: addMovie.mutateAsync,
    removeMovie: removeMovie.mutate,
    addSeries: addSeries.mutateAsync,
    removeSeries: removeSeries.mutate,

    isAddingMovie: addMovie.isPending,
    isRemovingMovie: removeMovie.isPending,
    isAddingSeries: addSeries.isPending,
    isRemovingSeries: removeSeries.isPending,
  };
};
