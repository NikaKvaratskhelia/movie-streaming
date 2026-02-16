import { create } from 'zustand';
import { Movie } from '@/generated/prisma/browser';
import { fetchMovies, deleteMovie, addMovie, updateMovie } from '@/src/services/movie-services';

interface MovieStore {
  movies: Movie[];
  loading: boolean;
  error: string | null;
  fetchMovies: () => Promise<void>;
  addMovie: (movie: Omit<Movie, 'id' | 'producer' | 'actors'>) => Promise<void>;
  removeMovie: (id: number) => Promise<void>;
  updateMovie: (id: number, movie: Partial<Movie>) => Promise<void>;
}

export const useMovieStore = create<MovieStore>((set, get) => ({
  movies: [],
  loading: false,
  error: null,

  fetchMovies: async () => {
    set({ loading: true, error: null });
    try {
      const movies = await fetchMovies();
      set({ movies, loading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch movies',
        loading: false 
      });
    }
  },

  addMovie: async (movieData) => {
    set({ loading: true, error: null });
    try {
      const newMovie = await addMovie(movieData);
      set(state => ({
        movies: [...state.movies, newMovie],
        loading: false
      }));
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to add movie',
        loading: false 
      });
    }
  },

  removeMovie: async (id: number) => {
    set({ loading: true, error: null });
    try {
      await deleteMovie(id);
      set(state => ({
        movies: state.movies.filter(movie => movie.id !== id),
        loading: false
      }));
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to delete movie',
        loading: false 
      });
    }
  },

  updateMovie: async (id: number, updatedMovie) => {
    set({ loading: true, error: null });
    try {
      const updated = await updateMovie(id, updatedMovie);
      set(state => ({
        movies: state.movies.map(movie =>
          movie.id === id ? updated : movie
        ),
        loading: false
      }));
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to update movie',
        loading: false 
      });
    }
  },
}));