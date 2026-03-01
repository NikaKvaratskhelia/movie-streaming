"use client";

import * as React from "react";
import {
  CircleUser,
  Clapperboard,
  Film,
  LayoutDashboard,
  Link as LinkIcon,
  Tv,
  Users,
  ChevronLeft,
} from "lucide-react";
import NavLink from "./NavLink";
import { useState } from "react";

type NavItem = {
  href: string;
  text: string;
  icon: React.ReactNode;
};

type NavSection = {
  key: string;
  label: string;
  items: NavItem[];
};

const SECTIONS: NavSection[] = [
  {
    key: "content",
    label: "Content",
    items: [
      {
        href: "/admin",
        text: "Dashboard",
        icon: <LayoutDashboard size={18} />,
      },
      { href: "/admin/movies", text: "Movies", icon: <Film size={18} /> },
      { href: "/admin/series", text: "Series", icon: <Tv size={18} /> },
    ],
  },
  {
    key: "people",
    label: "People",
    items: [
      { href: "/admin/actors", text: "Actors", icon: <CircleUser size={18} /> },
      {
        href: "/admin/producers",
        text: "Producers",
        icon: <Clapperboard size={18} />,
      },
    ],
  },
  {
    key: "management",
    label: "Management",
    items: [
      { href: "/admin/users", text: "Users", icon: <Users size={18} /> },
      {
        href: "/admin/movie-to-actor",
        text: "Actors to Movie",
        icon: <LinkIcon size={18} />,
      },
    ],
  },
];

export default function Aside() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`sticky top-0 h-dvh shrink-0
        border-r border-white/5 bg-[#0a0c0f] backdrop-blur
        transition-[width] duration-200 ease-out ${collapsed ? "w-16" : "w-64"}`}
    >
      <div className="flex h-16 items-center justify-between px-3">
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-white/5 text-white">
            <span className="text-sm font-semibold">A</span>
          </div>

          {!collapsed && (
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">
                Admin Panel
              </p>
              <p className="truncate text-xs text-white/50">Control center</p>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => setCollapsed((v) => !v)}
          className={`grid h-9 w-9 place-items-center rounded-xl border border-white/5 bg-white/0 text-white/70 hover:bg-white/5 hover:text-white transition cursor-pointer ${collapsed ? "rotate-180" : ""}`}
          title={collapsed ? "Expand" : "Collapse"}
        >
          <ChevronLeft size={18} />
        </button>
      </div>

      <nav className="flex flex-col gap-6 px-2 pb-6">
        {SECTIONS.map((section) => (
          <div key={section.key} className="flex flex-col gap-2">
            <p
              className={`px-2 text-xs font-medium uppercase tracking-wider text-neutral-500 ${collapsed ? "sr-only" : ""}`}
            >
              {section.label}
            </p>

            <div className="flex flex-col gap-1">
              {section.items.map((item) => (
                <NavLink
                  key={item.href}
                  href={item.href}
                  text={item.text}
                  icon={item.icon}
                  collapsed={collapsed}
                />
              ))}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}
