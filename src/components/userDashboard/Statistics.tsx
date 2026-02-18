"use client";
import StatisticsDiv from "./StatisticsDiv";

export default function Statistics() {
  return (
    <div className="flex flex-wrap gap-4">
      {/* dinamiuri statistika unda chavsva mere */}
      <StatisticsDiv
        text="5"
        label="Movies in your watchlist"
        heading="Movies"
      />
      <StatisticsDiv
        text="3"
        label="Series in yout watchlist"
        heading="Series"
      />
      <StatisticsDiv
        text="8.1"
        label="Your watchlists average rating"
        heading="AVG. Rating"
      />
      <StatisticsDiv
        text="47h"
        label="Est. total runtime"
        heading="WATCH TIME"
      />
    </div>
  );
}
