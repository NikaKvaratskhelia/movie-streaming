"use client";

import { useAdminUsers } from "@/src/hooks/useAdminUsers";
import { useMovies } from "@/src/hooks/useMovie";
import { useProducers } from "@/src/hooks/useProducers";
import { useSeries } from "@/src/hooks/useSeries";
import { CircleUser, Film, Tv, Users } from "lucide-react";
import StatisticCard from "./StatisticCard";

export default function StatisticsLayout() {
  const { users } = useAdminUsers();
  const { movies } = useMovies();
  const { series } = useSeries();
  const { producers } = useProducers();

  const statistics = [
    {
      label: "Movies",
      count: movies.length,
      icon: <Film />,
    },

    {
      label: "Series",
      count: series.length,
      icon: <Tv />,
    },

    {
      label: "Producers",
      count: producers.length,
      icon: <CircleUser />,
    },

    {
      label: "Users",
      count: users.length + 1, // imitom rom APIdan tviton am admins ar tvlis, tableshi shemtxvevit rom ar washalos tavis acc
      icon: <Users />,
    },
  ];

  return (
    <div className="grid gap-4 mt-8 grid-cols-[repeat(auto-fit,minmax(240px,1fr))] w-full">
      {statistics.map((i, indx) => (
        <StatisticCard
          key={indx}
          label={i.label}
          count={i.count}
          icon={i.icon}
        />
      ))}
    </div>
  );
}
