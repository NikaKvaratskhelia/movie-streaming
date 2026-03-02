import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Movie } from "@/generated/prisma/browser";
import {
  fetchMovies,
  deleteMovie,
  addMovie,
  updateMovie,
} from "@/src/services/movie-services";
import { toast } from "sonner";

type MoviesKey = readonly ["movies"];

export const useMovies = () => {
  const queryClient = useQueryClient();
  const queryKey: MoviesKey = ["movies"];

  const moviesQuery = useQuery({
    queryKey,
    queryFn: async () => {
      const resp = await fetchMovies();
      const data = resp.data as Movie[];
      return [...data].sort((a, b) => b.id - a.id); 
    },
  });

  const addMovieMutation = useMutation({
    mutationFn: (movie: Partial<Movie>) => addMovie(movie),
    onMutate: async (movie) => {
      await queryClient.cancelQueries({ queryKey });
      const previous = queryClient.getQueryData<Movie[]>(queryKey);

      const optimistic: Movie = {
        id: Number.MAX_SAFE_INTEGER * -1,
        title: movie.title ?? "",
        description: movie.description ?? "",
        coverPhoto: movie.coverPhoto ?? "",
        yearPublished: movie.yearPublished ?? 1900,
        duration: movie.duration ?? 0,
        rating: (movie.rating ?? 0) as Movie["rating"],
        createdAt: new Date(),
        genres: movie.genres ?? [],
        producerId: movie.producerId ?? 0,
      };

      queryClient.setQueryData<Movie[]>(queryKey, (old = []) => [
        optimistic,
        ...old,
      ]);
      return { previous };
    },
    onError: (_err, _movie, context) => {
      if (context?.previous)
        queryClient.setQueryData(queryKey, context.previous);
      toast.error("Failed to add movie");
    },
    onSuccess: () => toast.success("Movie added successfully!"),
    onSettled: () => queryClient.invalidateQueries({ queryKey }),
  });

  const removeMovieMutation = useMutation({
    mutationFn: (id: number) => deleteMovie(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey });
      const previous = queryClient.getQueryData<Movie[]>(queryKey);

      queryClient.setQueryData<Movie[]>(queryKey, (old = []) =>
        old.filter((m) => m.id !== id),
      );
      return { previous };
    },
    onError: (_err, _id, context) => {
      if (context?.previous)
        queryClient.setQueryData(queryKey, context.previous);
      toast.error("Failed to delete movie");
    },
    onSuccess: () => toast.success("Movie deleted successfully!"),
    onSettled: () => queryClient.invalidateQueries({ queryKey }),
  });

  const updateMovieMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Movie> }) =>
      updateMovie(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey });
      const previous = queryClient.getQueryData<Movie[]>(queryKey);

      queryClient.setQueryData<Movie[]>(queryKey, (old = []) =>
        old.map((m) => (m.id === id ? ({ ...m, ...data } as Movie) : m)),
      );

      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous)
        queryClient.setQueryData(queryKey, context.previous);
      toast.error("Failed to update movie");
    },
    onSuccess: () => toast.success("Movie updated successfully!"),
    onSettled: () => queryClient.invalidateQueries({ queryKey }),
  });

  return {
    movies: moviesQuery.data ?? [],
    error: moviesQuery.error,

    isLoading: moviesQuery.isLoading,
    isFetching: moviesQuery.isFetching,

    addMovie: addMovieMutation.mutateAsync,
    removeMovie: removeMovieMutation.mutateAsync,
    updateMovie: updateMovieMutation.mutateAsync,

    isAddingMovie: addMovieMutation.isPending,
    isRemovingMovie: removeMovieMutation.isPending,
    isUpdatingMovie: updateMovieMutation.isPending,
  };
};
