import Link from "next/link";
import SearchInput from "@/src/components/shared/SearchInput";
import UserLink from "../header/UserLink";

const Header = () => {
  return (
    <header className="h-28 bg-black text-white flex items-center fixed r-0 l-0 w-full z-11">
      <div className="max-w-300 w-full mx-auto flex items-center justify-between">
        <nav className="flex items-center gap-6">
          <Link
            href="/"
            className="text-[16px]  transition-colors relative group"
          >
            Home
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
          </Link>
          <Link
            href="/genre"
            className="text-[16px]  transition-colors relative group"
          >
            Genre
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
          </Link>
          <Link
            href="/country"
            className="text-[16px]  transition-colors relative group"
          >
            Country
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
          </Link>
        </nav>
        <SearchInput />
        <nav className="flex items-center gap-6">
          <Link
            href="/movies"
            className="text-[16px]  transition-colors relative group"
          >
            Movies
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
          </Link>
          <Link
            href="/series"
            className="text-[16px] transition-colors relative group"
          >
            Series
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
          </Link>
          <Link
            href="/animation"
            className="text-[16px]transition-colors relative group"
          >
            Animation
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
          </Link>
          <UserLink />
        </nav>
      </div>
    </header>
  );
};

export default Header;
