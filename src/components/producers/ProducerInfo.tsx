import { Movie } from "@/generated/prisma/browser";

interface ProducerInfoProps {
  producer: {
    id: number;
    fullName: string;
    nationality: string;
    dateOfBirth: string | Date;
    debutYear: number;
    movies: Movie[];
  };
}

export default function ProducerInfo({ producer }: ProducerInfoProps) {
  return (
    <section className="relative mb-12 overflow-hidden rounded-3xl bg-linear-to-br from-zinc-900 via-black to-zinc-950 border border-zinc-800 p-10">
      <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-red-600/10 blur-3xl" />

      <div className="relative z-10">
        <h1 className="text-5xl font-extrabold tracking-tight text-white">
          {producer.fullName}
        </h1>

        <div className="mt-6 h-px w-full bg-linear-to-r from-transparent via-zinc-700 to-transparent" />

        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          <InfoBlock label="Nationality" value={producer.nationality} />

          <InfoBlock
            label="Born"
            value={new Date(producer.dateOfBirth).toLocaleDateString()}
          />

          <InfoBlock label="Debut" value={producer.debutYear} />

          <InfoBlock label="Movies" value={producer.movies.length} />
        </div>
      </div>
    </section>
  );
}

function InfoBlock({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="group">
      <p className="text-xs uppercase tracking-widest text-zinc-500 mb-2">
        {label}
      </p>
      <p className="text-2xl font-semibold text-zinc-200 transition-colors duration-300 group-hover:text-red-500">
        {value}
      </p>
    </div>
  );
}
