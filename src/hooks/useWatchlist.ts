import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addMovieToWatchist,
  addSerieToWatchist,
  getWatchlists,
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

interface WatchlistsResponse {
  movieWatchlists: (MovieWatchlist & {
    movie: Movie;
  })[];
  seriesWatchlists: (SeriesWatchlist & {
    series: Series;
  })[];
}

export const useWatchlist = () => {
  const { token } = useAuthStore();
  const queryClient = useQueryClient();

  const queryKey = ["watchlists", token];

  const watchlistsQuery = useQuery({
    queryKey,
    queryFn: async (): Promise<WatchlistsResponse> => {
      if (!token) throw new Error("No Token");

      const res = await getWatchlists(token);

      if (!res.ok) {
        throw new Error(res.message);
      }

      return {
        movieWatchlists: res.data.movieWatchlists ?? [],
        seriesWatchlists: res.data.seriesWatchlists ?? [],
      };
    },
    enabled: typeof token === "string",
  });

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

  const rollback = (
    context: { previous: WatchlistsResponse | undefined } | undefined,
  ) => {
    if (context?.previous) {
      queryClient.setQueryData(queryKey, context.previous);
    }
  };

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey });
  };

  const addMovie = useMutation({
    mutationFn: (movieId: number) => {
      if (!token) throw new Error("No token");
      return addMovieToWatchist(token, movieId);
    },
    onMutate: async (movieId) => {
      return optimisticUpdate((old) => ({
        ...old,
        movieWatchlists: [
          ...old.movieWatchlists,
          {
            id: Date.now(),
            userId: "temp",
            movieId,
            movie: {
              id: movieId,
              title: "Loading...",
              description: "",
              coverPhoto: "",
              yearPublished: 0,
              duration: 0,
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              rating: 0 as any,
              genres: [],
              producerId: 0,
            },
          },
        ],
      }));
    },
    onError: (_err, _id, context) => {
      rollback(context);
    },
    onSettled: invalidate,
  });

  const removeMovie = useMutation({
    mutationFn: (movieId: number) => {
      if (!token) throw new Error("No token");
      return removeMovieFromWatchist(token, movieId);
    },
    onMutate: async (movieId) => {
      return optimisticUpdate((old) => ({
        ...old,
        movieWatchlists: old.movieWatchlists.filter(
          (m) => m.movieId !== movieId,
        ),
      }));
    },
    onError: (_err, _id, context) => {
      rollback(context);
    },
    onSettled: invalidate,
  });

  const addSeries = useMutation({
    mutationFn: (seriesId: number) => {
      if (!token) throw new Error("No token");
      return addSerieToWatchist(token, seriesId);
    },
    onMutate: async (seriesId) => {
      return optimisticUpdate((old) => ({
        ...old,
        seriesWatchlists: [
          ...old.seriesWatchlists,
          {
            id: Date.now(),
            userId: "temp",
            seriesId,
            series: {
              id: seriesId,
              title: "Loading...",
              description: "",
              coverPhoto: "",
              yearPublished: 0,
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              rating: 0 as any,
              genres: [],
              producerId: 0,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          },
        ],
      }));
    },
    onError: (_err, _id, context) => {
      rollback(context);
    },
    onSettled: invalidate,
  });

  const removeSeries = useMutation({
    mutationFn: (seriesId: number) => {
      if (!token) throw new Error("No token");
      return removeSerieFromWatchist(token, seriesId);
    },
    onMutate: async (seriesId) => {
      return optimisticUpdate((old) => ({
        ...old,
        seriesWatchlists: old.seriesWatchlists.filter(
          (s) => s.seriesId !== seriesId,
        ),
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
