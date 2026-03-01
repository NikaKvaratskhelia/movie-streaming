"use client";

import EditProfileButton from "@/src/components/shared/EditProfileButton";
import { useSettings } from "../../hooks/useSettings";
import Loader from "../ui/Loader";

export default function AccountOverview() {
  const getInitials = (name: string) => {
    if (!name) return "U";
    const names = name.split(" ");
    return names
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const { user, loading } = useSettings();

  if (loading) return <Loader />;

  return (
    <div className="bg-[#13131A] border border-[#232328] p-4 sm:p-6 rounded-xl shadow-lg">
      <h2 className="text-[16px] text-white mb-6">Account Overview</h2>

      {/* Avatar + Info */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
        <div className="w-16 h-16 bg-[#E7C87E] rounded-full flex items-center justify-center shrink-0">
          <span className="text-black font-bold text-lg">
            {getInitials(
              user?.firstName && user?.lastName
                ? `${user.firstName} ${user.lastName}`
                : user?.email || "U",
            )}
          </span>
        </div>

        <div className="flex-1 text-center sm:text-left">
          <h3 className="text-white font-semibold text-lg break-words">
            {user?.firstName && user?.lastName
              ? `${user.firstName} ${user.lastName}`
              : "User"}
          </h3>
          <p className="text-[#6C6980] text-sm break-all">
            {user?.email || "No email"}
          </p>
        </div>
      </div>

      {/* Role + Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
<span className="bg-[#E7C87E] text-black px-3 py-1 rounded-full text-sm font-medium w-fit">
          {user?.role || "USER"}
        </span>

        <div className="w-full sm:w-auto">
          <EditProfileButton />
        </div>
      </div>
    </div>
  );
}