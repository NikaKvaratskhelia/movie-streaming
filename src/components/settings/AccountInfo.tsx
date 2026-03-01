"use client";

import { useWatchlist } from "@/src/hooks/useWatchlist";
import { useSettings } from "../../hooks/useSettings";
import Loader from "../ui/Loader";
import { queryClient } from "@/src/lib/tanstack-query";
import { useAuthStore } from "@/src/store/useLoginStore";
import { useRouter } from "next/navigation";
export default function AccountInfo() {
  const { movieWatchlist, seriesWatchlist } = useWatchlist();
  const { user } = useSettings();
  const router = useRouter();
  const logout = useAuthStore((s) => s.logout);

  const handleLogout = () => {
    logout();
    queryClient.removeQueries({ queryKey: ["currentUser"] });
    router.push("/");
  };

  if (!user) return <Loader />;

  return (
    <div className="bg-[#13131a] rounded-lg shadow-sm border border-[#232328] p-4 sm:p-6 w-full max-w-150">
      <h2 className="text-lg sm:text-xl text-white font-semibold mb-4">My Stats</h2>

      <div className="space-y-3">
        <div className="flex justify-between items-center py-3 sm:py-2 border-b border-[#242429]">
          <span className="text-[#6C6980] text-sm sm:text-base">Movies Watchlisted</span>
          <span className="text-xl sm:text-2xl text-white font-semibold">{movieWatchlist.length}</span>
        </div>

        <div className="flex justify-between items-center py-3 sm:py-2 border-b border-[#242429]">
          <span className="text-[#6C6980] text-sm sm:text-base">Series Watchlisted</span>
          <span className="text-xl sm:text-2xl text-white font-semibold">{seriesWatchlist.length}</span>
        </div>

        <div className="flex justify-between items-center py-3 sm:py-2 border-b border-[#242429]">
          <span className="text-[#6C6980] text-sm sm:text-base">Account Role</span>
          <span className="text-white text-sm sm:text-base font-medium">{user.role}</span>
        </div>

        <div className="flex justify-between items-center py-3 sm:py-2 flex flex-col ">
          <span className="text-[#6C6980] text-sm sm:text-base">Account ID</span>
          <span className="text-white text-xs sm:text-sm font-mono break-all">{user.id}</span>
        </div>

        <button
          onClick={handleLogout}
          className="w-full mt-6 bg-red-600 hover:bg-red-700 active:scale-[.98] transition text-white font-medium py-3 sm:py-2 rounded-lg cursor-pointer text-sm sm:text-base"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
