import Link from "next/link";
import SearchInput from "@/src/components/shared/SearchInput";
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
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
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

        <div className="flex items-center gap-6">
          <div className="hidden md:block w-65">
            <SearchInput />
          </div>
          <UserLink />
        </div>
      </div>
    </header>
  );
}
