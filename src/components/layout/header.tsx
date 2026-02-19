"use client";

import Link from "next/link";
import { useState } from "react";
import SearchInput from "@/src/components/shared/SearchInputCode/search-input";
import UserLink from "../header/userLink";
import NavItem from "../header/Navitem";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/movies", label: "Movies" },
  { href: "/series", label: "Series" },
  { href: "/producers", label: "Producers" },
  { href: "/actors", label: "Actors" },
  { href: "/country", label: "Country" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-semibold tracking-wide text-white"
        >
          CINE<span className="text-red-600">VAULT</span>
        </Link>
        <nav className="hidden lg:flex items-center gap-10">
          {navItems.map((item, index) => (
            <NavItem key={index} href={item.href} label={item.label} />
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-6">
          <div className="w-65">
            <SearchInput />
          </div>
          <UserLink />
        </div>
        <button
          className="lg:hidden flex flex-col items-center justify-center w-8 h-8 gap-1.5"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
              mobileMenuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
              mobileMenuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
              mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>
      {mobileMenuOpen && (
        <div className="lg:hidden bg-black/95 backdrop-blur-xl border-t border-white/10">
          <div className="px-4 py-6 space-y-6">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="text-white/80 hover:text-white transition-colors text-lg font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="md:hidden">
              <SearchInput />
            </div>
            <div className="md:hidden">
              <UserLink />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
