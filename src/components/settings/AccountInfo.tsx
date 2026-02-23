"use client";

import { useWatchlist } from "@/src/hooks/useWatchlist";
import { getStatistics } from "@/src/services/watchlist-service";
import { User } from "@/generated/prisma/browser";
import { useAuthStore } from "@/src/store/useLoginStore";
import { useQuery } from "@tanstack/react-query";

interface AccountInfoProps {
  user: User;
}

export default function AccountInfo({ user }: AccountInfoProps) {
  const { movieWatchlist, seriesWatchlist } = useWatchlist();
  const { token } = useAuthStore();

  useQuery({
    queryKey: ["watchlist-stats", token],
    queryFn: () => {
      if (!token) throw new Error("No token");
      return getStatistics(token);
    },
    enabled: !!token,
  });

  return (
    <div className="bg-[#13131a] rounded-lg shadow-sm border border-[#232328] p-6 w-full max-w-[600px]">
      <h2 className="text-xl text-white font-semibold mb-4">My Stats</h2>

      <div className="space-y-3">
        <div className="flex justify-between items-center py-2 border-b border-[#242429]">
          <span className="text-[#6C6980]">Movies Watchlisted</span>
          <span className="text-2xl text-white">{movieWatchlist.length}</span>
        </div>

        <div className="flex justify-between items-center py-2 border-b border-[#242429]">
          <span className="text-[#6C6980]">Series Watchlisted</span>
          <span className="text-2xl text-white">{seriesWatchlist.length}</span>
        </div>

        <div className="flex justify-between items-center py-2 border-b border-[#242429]">
          <span className="text-[#6C6980]">Account Role</span>
          <span className="text-white">{user.role}</span>
        </div>

        <div className="flex justify-between items-center py-2">
          <span className="text-[#6C6980]">Account ID</span>
          <span className=" text-white text-sm">{user.id}</span>
        </div>
      </div>
    </div>
  );
}
