"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useAuthStore } from "@/src/store/useLoginStore";
import { useUserStore } from "@/src/store/useUserStore";

export default function UserLink() {
  const { token } = useAuthStore();
  const { user, fetchUser } = useUserStore();

  useEffect(() => {
    if (token) {
      fetchUser(token);
    }
  }, [token, fetchUser]);

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
