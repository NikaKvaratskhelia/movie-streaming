"use client";

import { Episode, Prisma } from "@/generated/prisma/browser";
import Episodes from "./Episode";
import { useState } from "react";
import { Dropdown } from "../shared/Dropdown";

type SeriesWithSeasons = Prisma.SeriesGetPayload<{
  include: {
    seasons: {
      include: {
        episodes: true;
      };
    };
  };
}>;

interface EpisodesSectionProps {
  series: SeriesWithSeasons;
}

export default function EpisodesSection({ series }: EpisodesSectionProps) {
  const [currentEp, setCurrentEp] = useState(0);
  const [currentSeason, setCurrentSeason] = useState(0);

  if (!series?.seasons?.length) return null;

  const currentEpisodes = series.seasons[currentSeason]?.episodes || [];

  return (
    <div className="flex flex-col gap-3 relative text-white w-full mt-14">
      <div className="relative">
        <Dropdown
          value={"0"}
          options={series.seasons.map((s, idx) => ({
            label: `Season ${s.countInSerie}`,
            value: idx.toString(),
          }))}
          onChange={(val) => setCurrentSeason(parseInt(val))}
        />
      </div>

      <div className="flex flex-wrap gap-2 mt-4 w-full">
        {currentEpisodes.map((episode: Episode, index: number) => (
          <Episodes
            key={episode.id}
            ep={episode}
            active={index === currentEp}
            onClick={() => setCurrentEp(index)}
          />
        ))}
      </div>
    </div>
  );
}
