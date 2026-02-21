"use client";

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

export default function HeaderClient() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
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
      {mobileMenuOpen && (
        <div className="lg:hidden fixed top-20 left-0 right-0 bg-black/95 backdrop-blur-xl border-t border-white/10 z-40">
          <div className="px-4 py-6 space-y-6">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="text-white/80 hover:text-white transition-colors text-lg font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
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
    </>
  );
}
