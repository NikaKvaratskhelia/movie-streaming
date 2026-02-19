import { useWatchlist } from "@/src/hooks/useWatchlist";
import { useAuthStore } from "@/src/store/useLoginStore";
import { Heart } from "lucide-react";

export default function AddToWatchlistBtn({
  id,
  category,
}: {
  id: number;
  category: string;
}) {
  const { token } = useAuthStore();
  const { addSeries, addMovie } = useWatchlist(token ?? "");

  async function handleClick() {
    if (!token) {
      console.log("u need to log in first");
    }

    if (category === "movie") {
      const res = await addMovie(id);
      console.log(res);
    } else {
      const res = await addSeries(id);
      console.log(res);
    }
  }
  return (
    <button
      onClick={handleClick}
      className="absolute top-3 right-3 w-10 h-10 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 transform       group-hover:opacity-100 group-hover:scale-100 opacity-0 scale-75 hover:bg-black/80 hover:scale-110 cursor-pointer"
    >
      <Heart size={18} className="transition-colors duration-300" />
    </button>
  );
}
