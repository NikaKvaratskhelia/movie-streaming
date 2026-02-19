import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Movie } from "@/generated/prisma/browser";
import {
  fetchMovies,
  deleteMovie,
  addMovie,
  updateMovie,
} from "@/src/services/movie-services";

export const useMovies = () => {
  const queryClient = useQueryClient();
  const queryKey = ["movies"];

  const moviesQuery = useQuery({
    queryKey,
    queryFn: async () => {
      const resp = await fetchMovies();
      return resp.data as Movie[];
    },
  });

  const addMovieMutation = useMutation({
    mutationFn: (movie: Movie) => addMovie(movie),
    onMutate: async (newMovie) => {
      await queryClient.cancelQueries({ queryKey });
      const previous = queryClient.getQueryData<Movie[]>(queryKey);
      queryClient.setQueryData<Movie[]>(queryKey, (old = []) => [
        ...old,
        newMovie,
      ]);
      return { previous };
    },
    onError: (_err, _movie, context) => {
      if (context?.previous) {
        queryClient.setQueryData(queryKey, context.previous);
      }
    },
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
      if (context?.previous) {
        queryClient.setQueryData(queryKey, context.previous);
      }
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey }),
  });

  const updateMovieMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Movie> }) =>
      updateMovie(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey });
      const previous = queryClient.getQueryData<Movie[]>(queryKey);
      queryClient.setQueryData<Movie[]>(queryKey, (old = []) =>
        old.map((m) => (m.id === id ? { ...m, ...data } : m)),
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
    movies: moviesQuery.data ?? [],
    isLoading: moviesQuery.isLoading,
    error: moviesQuery.error,
    addMovie: addMovieMutation.mutateAsync,
    removeMovie: removeMovieMutation.mutate,
    updateMovie: updateMovieMutation.mutate,
    isAddingMovie: addMovieMutation.isPending,
    isRemovingMovie: removeMovieMutation.isPending,
    isUpdatingMovie: updateMovieMutation.isPending,
  };
};
