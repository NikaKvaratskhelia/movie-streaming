import Link from "next/link";

const Header = () => {
  return (
    <header className="h-28 bg-black text-white flex items-center">
      <div className="max-w-300 w-full mx-auto flex items-center justify-between">
        <nav className="flex items-center gap-6">
          <Link href="/" className="text-[16px]  transition-colors relative group">
            Home
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
          </Link>
          <Link href="/genre" className="text-[16px]  transition-colors relative group">
            Genre
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
          </Link>
          <Link href="/country" className="text-[16px]  transition-colors relative group">
            Country
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
          </Link>
        </nav>
        <div className="relative mx-6">
          <input
            type="text"
            placeholder="Search movies......."
            className="w-104 h-12 text-[16px] rounded-full px-6 pr-12 bg-white text-black placeholder:text-black"
          />
          <svg
            className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 text-black"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M16 10a6 6 0 11-12 0 6 6 0 0112 0z"
            />
          </svg>
        </div>
        <nav className="flex items-center gap-6">
          <Link href="/movies" className="text-[16px]  transition-colors relative group">
            Movies
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
          </Link>
          <Link href="/series" className="text-[16px] transition-colors relative group">
            Series
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
          </Link>
          <Link href="/animation" className="text-[16px]transition-colors relative group">
            Animation
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
          </Link>
          <Link href="/login" className="text-[16px]  transition-colors relative group">
            Login/Signup
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
