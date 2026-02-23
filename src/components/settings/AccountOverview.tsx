"use client";

import EditProfileButton from "@/src/components/shared/EditProfileButton";

interface AccountOverviewProps {
  user: any;
}

export default function AccountOverview({ user }: AccountOverviewProps) {
  const getInitials = (name: string) => {
    if (!name) return "U";
    const names = name.split(" ");
    return names.map(n => n[0]).join("").toUpperCase().slice(0, 2);
  };

  return (
    <div className="bg-[#13131A] border-[1px] border-[#232328] p-6 rounded-xl shadow-lg">
      <h2 className="text-[16px] text-white mb-6">Account Overview</h2>
      
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-16 h-16 bg-[#E7C87E] rounded-full flex items-center justify-center">
          <span className="text-black font-bold text-lg">
            {getInitials(user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : user?.email || "U")}
          </span>
        </div>
        
        <div className="flex-1">
          <h3 className="text-white font-semibold text-lg">
            {user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : "User"}
          </h3>
          <p className="text-[#6C6980] text-sm">{user?.email || "No email"}</p>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <span className="bg-[#E7C87E] text-black px-3 py-1 rounded-full text-sm font-medium">
          {user?.role || "USER"}
        </span>
        
        <EditProfileButton />
      </div>
    </div>
  );
}
