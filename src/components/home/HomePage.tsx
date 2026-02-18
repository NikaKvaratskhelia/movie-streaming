"use client";
import Hero from "./Hero";
import MovieSections from "./MovieSections";
import NewReleaseMovie from "./NewReleaseMovie";
import NewReleaseSeries from "./NewReleaseSeries";
import LoadingSpinner from "../shared/LoadingSpinner";
import { useState, useEffect } from "react";

export default function HomeImport() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Hero />

      <MovieSections />
      <NewReleaseMovie limit={4} />
      <NewReleaseSeries limit={4} />
    </>
  );
}
