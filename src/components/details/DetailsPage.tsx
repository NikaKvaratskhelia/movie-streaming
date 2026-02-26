import RecommendationSection from "../shared/RecommendationSection";
import Iframe from "./Iframe";
import MovieDetails from "./MovieDetails";

export default function detailsPage() {
  return (
    <div className="min-h-screen max-w-283 lg:max-w-283 md:max-w-full sm:max-w-full w-full mx-auto px-4 sm:px-6 flex flex-col justify-center items-center gap-8">
      <Iframe />
      <MovieDetails />
      <RecommendationSection />
    </div>
  );
}
