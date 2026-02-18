// import Hero from "./Hero";
import MovieSections from "./MovieSections";
import NewReleaseMovie from "./NewReleaseMovie";

export default function HomeImport() {
  return (
    <>
      {/* <Hero /> */}

      <MovieSections />
      <NewReleaseMovie limit={4} />
    </>
  );
}
