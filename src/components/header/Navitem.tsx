"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavItem({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link
      key={href}
      href={href}
      className={`relative text-sm font-medium transition-all duration-300
        ${isActive ? "text-white" : "text-white/60 hover:text-white"}`}
    >
      {label}

      <span
        className={`absolute left-0 -bottom-2 h-0.5 bg-red-600 transition-all duration-300
                    ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}
      />
    </Link>
  );
}
