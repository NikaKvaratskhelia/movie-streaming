import Header from "@/src/components/layout/header";
import MovieHeroSection from "@/src/components/home/movie-hero-section";
import { fetchMovies } from "@/src/services/movie-services";
import MovieCard from "@/src/components/shared/movie-card";
import { Movie } from "@/generated/prisma/browser";

export default async function Home() {
  const movies = await fetchMovies();

  return (
    <>
      <Header />
      <MovieHeroSection />

      <section className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Featured Movies</h2>

        {movies.length === 0 ? (
          <div className="text-center py-8">No movies available</div>
        ) : (
          <div>
            {movies.map((movie: Movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
