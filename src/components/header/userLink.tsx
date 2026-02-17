"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useAuthStore } from "@/src/store/useLoginStore";
import { useUserStore } from "@/src/store/useUserStore";

export default function UserLink() {
  const { token, hasHydrated } = useAuthStore();
  const { user, fetchUser } = useUserStore();

  useEffect(() => {
    if (hasHydrated && token) {
      fetchUser(token);
    }
  }, [token, fetchUser, hasHydrated]);

  if (!hasHydrated) return null;

  const isAuthenticated = !!token;

  return isAuthenticated ? (
    <Link
      href="/user-dashboard"
      className="text-[#e7000b] underline text-[20px]"
    >
      {user?.firstName || "Profile"}
    </Link>
  ) : (
    <div>
      <Link href="/login">Log In</Link> / <Link href="/register">Sign Up</Link>
    </div>
  );
}
