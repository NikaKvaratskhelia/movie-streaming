import { Film, Tv } from "lucide-react";
import Hero from "./Hero";
import LatestMoviesLayout from "./LatestMoviesLayout";
import StatisticsLayout from "./StatisticsLayout";

export default function AdminPage() {
  return (
    <div className="w-[95%]">
      <Hero />
      <StatisticsLayout />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(500px,1fr))] gap-10 mt-10">
        <LatestMoviesLayout
          type="movie"
          icon={<Film />}
          text={"Recent Movies"}
        />
        <LatestMoviesLayout type="series" icon={<Tv />} text={"Recent Series"} />
      </div>
    </div>
  );
}
