import Hero from "./Hero";
import MovieSections from "./MovieSections";
import NewReleaseMovie from "./NewReleaseMovie";
import NewReleaseSeries from "./NewReleaseSeries";

export default function HomeImport() {
  return (
    <div className="relative pb-30">
      <div className={`transition-opacity duration-700 `}>
        <Hero />
        <div className="max-w-[80vw] mx-auto">
          <MovieSections />
          <NewReleaseMovie limit={4} />
          <NewReleaseSeries limit={4} />
        </div>
      </div>
    </div>
  );
}
