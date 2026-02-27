"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Producers", href: "/admin/producers", icon: "◈" },
  { label: "Actors", href: "/admin/actors", icon: "◉" },
  { label: "Movies", href: "/admin/movies", icon: "▣" },
  { label: "Series", href: "/admin/series", icon: "◫" },
];

export function AdminHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/6 bg-[#080808]/95 backdrop-blur-xl max-w-300 mx-auto w-[90%] text-white">
        <div className="h-px w-full bg-linear-to-r from-transparent via-red-500/60 to-transparent" />

        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="/admin" className="group flex items-center gap-3">
            <span className="text-[18px] font-black uppercase tracking-[0.25em] text-white">
              Admin Panel
            </span>
          </Link>

          <nav className="hidden items-center md:flex">
            <div className="mr-6 h-5 w-px bg-white/10" />

            <div className="flex items-center gap-0.5">
              {navLinks.map(({ label, href }) => {
                const active = pathname?.startsWith(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`group relative flex items-center gap-2 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.15em] transition-all duration-200 ${
                      active
                        ? "text-white"
                        : "text-neutral-600 hover:text-neutral-300"
                    }`}
                  >
                    {active && (
                      <span className="absolute inset-0 rounded-sm bg-white/6" />
                    )}
                    <span className="absolute inset-0 rounded-sm bg-white/0 transition-colors group-hover:bg-white/4" />
                    {active && (
                      <span className="absolute bottom-0 left-3 right-3 h-px bg-linear-to-r from-transparent via-red-500 to-transparent" />
                    )}
                    <span className="relative">{label}</span>
                  </Link>
                );
              })}
            </div>
          </nav>

          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
              className="relative flex h-8 w-8 flex-col items-center justify-center gap-1.25 rounded border border-white/10 bg-white/5"
            >
              <span
                className={`h-px w-4 bg-neutral-400 transition-all duration-300 ${menuOpen ? "translate-y-0.75 rotate-45" : ""}`}
              />
              <span
                className={`h-px w-4 bg-neutral-400 transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""}`}
              />
              <span
                className={`h-px w-4 bg-neutral-400 transition-all duration-300 ${menuOpen ? "-translate-y-1.25 -rotate-45" : ""}`}
              />
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed left-10 top-16.25 z-40 border-b text-white border-white/6 bg-[#080808]/98 backdrop-blur-xl transition-all duration-300 md:hidden ${
          menuOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-2 opacity-0 pointer-events-none"
        }`}
      >
        <nav className="mx-auto max-w-7xl px-6 py-4">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {navLinks.map(({ label, href, icon }) => {
              const active = pathname?.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className={`group flex items-center gap-3 rounded-sm border px-4 py-3 transition-all duration-200 ${
                    active
                      ? "border-red-500/20 bg-red-500/5 text-white"
                      : "border-white/6 bg-white/2 text-neutral-500 hover:border-white/10 hover:bg-white/4 hover:text-neutral-300"
                  }`}
                >
                  <span
                    className={`text-base ${active ? "text-red-500" : "text-neutral-700 group-hover:text-neutral-500"}`}
                  >
                    {icon}
                  </span>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.15em]">
                    {label}
                  </span>
                  {active && (
                    <span className="ml-auto h-1 w-1 rounded-full bg-red-500" />
                  )}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>

      {menuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </>
  );
}
