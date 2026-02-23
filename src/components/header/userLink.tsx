"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useSettings } from "@/src/hooks/useSettings";
import Loader from "../ui/Loader";

export default function UserLink() {
  const { user, loading } = useSettings();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (loading) return <Loader />;

  const isAuthenticated = !!user;

  if (!isAuthenticated) {
    return (
      <div className="flex items-center gap-4 text-sm text-white ml-2">
        <Link
          href="/login"
          className="text-white/70 hover:text-white transition-colors"
        >
          Log In
        </Link>
        <Link
          href="/register"
          className="px-4 py-2 rounded-full bg-red-600 hover:bg-red-700 transition-all"
        >
          Sign Up
        </Link>
      </div>
    );
  }

  const initials = user?.firstName?.[0]?.toUpperCase() || "U";

  return (
    <div className="relative ml-2">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 cursor-pointer text-white"
      >
        <div className="w-9 h-9 rounded-full bg-red-600 flex items-center justify-center text-sm font-semibold">
          {initials}
        </div>
        <span className="text-sm text-white/80 hover:text-white transition">
          {user?.firstName}
        </span>
      </button>

      {open && (
        <div
          ref={menuRef}
          className="absolute right-0 mt-3 w-44 bg-neutral-900 border border-white/10 rounded-xl shadow-xl p-2"
        >
          <Link
            href="/user-dashboard"
            className="block px-3 py-2 rounded-lg hover:bg-white/10 transition text-white"
          >
            Dashboard
          </Link>
          <Link
            href="/settings"
            className="block px-3 py-2 rounded-lg hover:bg-white/10 transition text-white"
          >
            Settings
          </Link>
        </div>
      )}
    </div>
  );
}
