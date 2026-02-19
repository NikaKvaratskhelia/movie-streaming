import { Movie } from "@/generated/prisma/browser";

export async function fetchMovies() {
  const res = await fetch("/api/movies");
  return await res.json();
}

export async function fetchMovieById(id: number) {
  const res = await fetch(`/api/movies/${id}`);
  return await res.json();
}

export async function deleteMovie(id: number) {
  const res = await fetch(`/api/movies/${id}`, {
    method: "DELETE",
  });
  return await res.json();
}

export async function addMovie(movie: Movie) {
  const res = await fetch("/api/movies", {
    method: "POST",
    body: JSON.stringify(movie),
  });

  const data = await res.json();
  return await data;
}

export async function updateMovie(id: number, movie: Partial<Movie>) {
  const res = await fetch(`/api/movies/${id}`, {
    method: "PUT",
    body: JSON.stringify(movie),
  });
  return await res.json();
}
