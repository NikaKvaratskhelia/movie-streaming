export async function fetchMovies() {
  const res = await fetch("/api/movies");
  return await res.json();
}