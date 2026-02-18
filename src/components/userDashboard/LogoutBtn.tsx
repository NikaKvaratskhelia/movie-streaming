"use client";

import { useAuthStore } from "@/src/store/useLoginStore";
import { useRouter } from "next/navigation";

export default function LogoutBtn() {
  const { logout } = useAuthStore();
  const router = useRouter();
  function handleClick() {
    logout();
    router.push("/");
  }
  return (
    <button
      onClick={handleClick}
      className="
            mt-auto w-full rounded-xl px-4 py-2.5
            border border-red-50
            text-sm font-medium
            text-gray-500
            transition-all duration-300
            hover:bg-red-50 hover:text-red-600
            active:scale-[0.98]
            cursor-pointer
        "
    >
      Sign Out
    </button>
  );
}
