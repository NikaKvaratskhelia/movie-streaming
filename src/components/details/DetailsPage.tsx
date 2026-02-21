import Iframe from "./Iframe";
import MovieDetails from "./MovieDetails";

export default function detailsPage() {
  return (
    <div className="min-h-screen max-w-283 w-full mx-auto flex flex-col justify-center items-center gap-8">
      <Iframe />;
      <MovieDetails/>
    </div>
  );
}
