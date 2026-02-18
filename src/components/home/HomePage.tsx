// import Hero from "./Hero";
import MovieSections from "./MovieSections";
import NewReleaseMovie from "./NewReleaseMovie";
import NewReleaseSeries from "./NewReleaseSeries";

export default function HomeImport() {
  return (
    <>
      {/* <Hero /> */}

      <MovieSections />
      <NewReleaseMovie limit={4} />
      <NewReleaseSeries limit={4} />
    </>
  );
}
