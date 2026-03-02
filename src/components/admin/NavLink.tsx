"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  href: string;
  text: string;
  icon: React.ReactNode;
  collapsed?: boolean;
};

export default function NavLink({
  href,
  text,
  icon,
  collapsed = false,
}: Props) {
  const pathname = usePathname();
  const active =
    pathname === href || (href !== "/admin" && pathname?.startsWith(href));

  return (
    <Link
      href={href}
      title={collapsed ? text : undefined}
      className={`group relative flex items-center gap-3 rounded-xl px-2 py-0.5
        text-sm transition ${
          active
            ? "bg-white/8 text-white"
            : "text-white/70 hover:bg-white/5 hover:text-white"
        } ${collapsed ? "justify-center" : "justify-start"}`}
    >
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/0 group-hover:bg-white/5">
        {icon}
      </span>

      {!collapsed && <span className="min-w-0 truncate">{text}</span>}

      {active && (
        <span className="absolute inset-y-2 left-0 w-1 rounded-r bg-white/30" />
      )}
    </Link>
  );
}
