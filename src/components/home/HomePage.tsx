import Hero from "./Hero";
import MovieSections from "./MovieSections";
import NewReleaseMovie from "./NewReleaseMovie";
import NewReleaseSeries from "./NewReleaseSeries";

export default function HomeImport() {
  return (
    <div className="relative">
      <div className={`transition-opacity duration-700 `}>
        <Hero />
        <MovieSections />
        <NewReleaseMovie limit={4} />
        <NewReleaseSeries limit={4} />
      </div>
    </div>
  );
}
