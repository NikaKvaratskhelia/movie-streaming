import Link from "next/link";
import { Movie, Series } from "@/generated/prisma/browser";
import Image from "next/image";

export default function ResultCard({
  data,
}: {
  data: (Movie & { type: "movie" }) | (Series & { type: "series" });
}) {
  const href =
    data.type === "series" ? `/series/${data.id}` : `/movies/${data.id}`;
  return (
    <Link
      href={href}
      className="flex items-center gap-3 p-3 hover:bg-gray-800 cursor-pointer border-b border-gray-700"
    >
      {data.coverPhoto ? (
        <Image
          src={data.coverPhoto}
          alt={data.title}
          width={40}
          height={60}
          className="object-cover rounded"
        />
      ) : (
        <div className="w-10 h-15 bg-gray-700 rounded flex items-center justify-center text-gray-400 text-xs">
          No img
        </div>
      )}

      <div>
        <h4 className="font-semibold text-red-500">{data.title}</h4>
        <p className="text-sm text-gray-400">{data.genres?.join(", ")}</p>

        <span className="text-xs text-gray-500">
          {data.type === "series" ? "Series" : "Movie"}
        </span>
      </div>
    </Link>
  );
}
