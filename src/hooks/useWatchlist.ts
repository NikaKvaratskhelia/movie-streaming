import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addMovieToWatchist,
  addSerieToWatchist,
  getWatchlists,
  getStatistics,
  removeMovieFromWatchist,
  removeSerieFromWatchist,
} from "../services/watchlist-service";
import {
  Movie,
  MovieWatchlist,
  Series,
  SeriesWatchlist,
} from "@/generated/prisma/browser";
import { useAuthStore } from "../store/useLoginStore";
import { toast } from "sonner";

interface WatchlistsResponse {
  movieWatchlists: (MovieWatchlist & { movie: Movie })[];
  seriesWatchlists: (SeriesWatchlist & { series: Series })[];
}

interface WatchlistStatistics {
  avgRating: string;
  totalRuntime: number;
}

export const useWatchlist = () => {
  const { token } = useAuthStore();
  const queryClient = useQueryClient();

  const queryKey = ["watchlists", token];
  const statsKey = ["watchlist-stats", token];

  /*
  =========================
  FETCH WATCHLISTS
  =========================
  */

  const watchlistsQuery = useQuery({
    queryKey,
    enabled: !!token,
    queryFn: async (): Promise<WatchlistsResponse> => {
      if (!token) throw new Error("Missing token");

      const res = await getWatchlists(token);

      if (!res.ok) throw new Error(res.message);

      return {
        movieWatchlists: res.data.movieWatchlists ?? [],
        seriesWatchlists: res.data.seriesWatchlists ?? [],
      };
    },
  });

  /*
  =========================
  FETCH STATS
  =========================
  */

  const statsQuery = useQuery({
    queryKey: statsKey,
    enabled: !!token,
    queryFn: async (): Promise<WatchlistStatistics> => {
      if (!token) throw new Error("Missing token");
      return getStatistics(token);
    },
  });

  /*
  =========================
  SHARED HELPERS
  =========================
  */

  const optimisticUpdate = async (
    updater: (old: WatchlistsResponse) => WatchlistsResponse,
  ) => {
    await queryClient.cancelQueries({ queryKey });

    const previous = queryClient.getQueryData<WatchlistsResponse>(queryKey);

    if (previous) {
      queryClient.setQueryData(queryKey, updater(previous));
    }

    return { previous };
  };

  const rollback = (ctx: { previous?: WatchlistsResponse } | undefined) => {
    if (ctx?.previous) {
      queryClient.setQueryData(queryKey, ctx.previous);
    }
  };

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey });
    queryClient.invalidateQueries({ queryKey: statsKey });
  };

  const addMovie = useMutation({
    mutationFn: async (movieId: number) => {
      if (!token) throw new Error("No token");
      return addMovieToWatchist(token, movieId);
    },

    onMutate: async (movieId) =>
      optimisticUpdate((old) => {
        if (old.movieWatchlists.some((m) => m.movieId === movieId)) return old;

        return {
          ...old,
          movieWatchlists: [
            ...old.movieWatchlists,
            {
              id: Date.now(),
              userId: "temp",
              movieId,
              movie: {} as Movie,
            },
          ],
        };
      }),

    onError: (err: Error, _id, ctx) => {
      toast.error(err.message);
      rollback(ctx);
    },

    onSuccess: (data) => {
      if (data.ok) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    },
    onSettled: invalidate,
  });

  const removeMovie = useMutation({
    mutationFn: async (movieId: number) => {
      if (!token) throw new Error("No token");
      return removeMovieFromWatchist(token, movieId);
    },

    onMutate: async (movieId) =>
      optimisticUpdate((old) => ({
        ...old,
        movieWatchlists: old.movieWatchlists.filter(
          (m) => m.movieId !== movieId,
        ),
      })),

    onSuccess: (data) => toast.success(data.message),
    onError: (err: Error, _id, ctx) => {
      toast.error(err.message);
      rollback(ctx);
    },

    onSettled: invalidate,
  });

  const addSeries = useMutation({
    mutationFn: async (seriesId: number) => {
      if (!token) throw new Error("No token");
      return addSerieToWatchist(token, seriesId);
    },

    onMutate: async (seriesId) =>
      optimisticUpdate((old) => {
        if (old.seriesWatchlists.some((s) => s.seriesId === seriesId))
          return old;

        return {
          ...old,
          seriesWatchlists: [
            ...old.seriesWatchlists,
            {
              id: Date.now(),
              userId: "temp",
              seriesId,
              series: {} as Series,
            },
          ],
        };
      }),

    onError: (err: Error, _id, ctx) => {
      toast.error(err.message);
      rollback(ctx);
    },
    onSuccess: (data) => {
      if (data.ok) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    },
    onSettled: invalidate,
  });

  const removeSeries = useMutation({
    mutationFn: async (seriesId: number) => {
      if (!token) throw new Error("No token");
      return removeSerieFromWatchist(token, seriesId);
    },

    onMutate: async (seriesId) =>
      optimisticUpdate((old) => ({
        ...old,
        seriesWatchlists: old.seriesWatchlists.filter(
          (s) => s.seriesId !== seriesId,
        ),
      })),
    onSuccess: (data) => {
      if (data.ok) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    },
    onError: (err: Error, _id, ctx) => {
      toast.error(err.message);
      rollback(ctx);
    },

    onSettled: invalidate,
  });

  return {
    movieWatchlist: watchlistsQuery.data?.movieWatchlists ?? [],
    seriesWatchlist: watchlistsQuery.data?.seriesWatchlists ?? [],

    avgRating: statsQuery.data?.avgRating ?? "0",
    totalRuntime: statsQuery.data?.totalRuntime ?? 0,

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
