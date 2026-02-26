import { Producer } from "@/generated/prisma/browser";
import Link from "next/link";

export default function ProducerCard({ producer }: { producer: Producer }) {
  return (
    <Link
      href={`/producers/${producer.id}`}
      className="group relative block w-full max-w-sm"
    >
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-zinc-900 via-zinc-950 to-black p-px transition-all duration-500 hover:scale-[1.02]">
        <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-linear-to-r from-red-600/40 via-transparent to-red-600/40 blur-xl" />

        <div className="relative rounded-3xl bg-zinc-950/90 backdrop-blur-xl p-8 border border-zinc-800 transition-all duration-500 group-hover:border-zinc-600">
          <h2 className="text-2xl font-bold tracking-tight text-white transition-all duration-300 group-hover:text-red-500">
            {producer.fullName}
          </h2>

          <div className="mt-4 h-px w-full bg-linear-to-r from-transparent via-zinc-700 to-transparent" />

          <div className="mt-6 space-y-4 text-sm">
            <div className="flex justify-between">
              <span className="text-zinc-500 uppercase tracking-wider text-xs">
                Nationality
              </span>
              <span className="text-zinc-300 font-medium">
                {producer.nationality}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-zinc-500 uppercase tracking-wider text-xs">
                Born
              </span>
              <span className="text-zinc-300 font-medium">
                {new Date(producer.dateOfBirth).toLocaleDateString()}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-zinc-500 uppercase tracking-wider text-xs">
                Debut
              </span>
              <span className="text-zinc-300 font-medium">
                {producer.debutYear}
              </span>
            </div>
          </div>

          <div className="mt-8 text-xs tracking-widest text-zinc-600 group-hover:text-red-500 transition-colors duration-300">
            VIEW PROFILE →
          </div>
        </div>
      </div>
    </Link>
  );
}
