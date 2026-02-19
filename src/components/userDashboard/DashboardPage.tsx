import MoviesSection from "./MoviesSection";
import Statistics from "./Statistics";

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-4 max-w-300 w-full mx-auto">
      <h1 className="text-4xl font-bold text-white">My Watchlist</h1>
      <p className="text-gray-500">
        Your saved movies and series, all in one place.
      </p>

      <div className="flex flex-wrap gap-4 mt-10">
        <Statistics />
      </div>

      <div className="flex flex-wrap gap-16">
        <MoviesSection text="Movies" />
        <MoviesSection text="Series" />
      </div>
    </div>
  );
}
