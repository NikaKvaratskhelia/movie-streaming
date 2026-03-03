import { Actor } from "@/generated/prisma/browser";
import { SeriesWithCount } from "@/src/types/SeriesWithCount";

interface ActorInfoProps {
  actor: Actor & {
    movies?: any[];
    series?: SeriesWithCount[];
  };
}

export default function ActorInfo({ actor }: ActorInfoProps) {
  const formatDate = (date: Date | string) => {
    try {
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      if (isNaN(dateObj.getTime())) {
        return 'Unknown date';
      }
      return new Intl.DateTimeFormat('ka-GE', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }).format(dateObj);
    } catch (error) {
      return 'Unknown date';
    }
  };

  return (
    <section className="relative mb-12 overflow-hidden rounded-3xl bg-linear-to-br from-zinc-900 via-black to-zinc-950 border border-zinc-800 p-12 w-full ">
      <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-red-600/10 blur-3xl" />

      <div className="relative z-10">
        <h1 className="text-5xl font-extrabold tracking-tight text-white">
          {actor.fullName}
        </h1>

        <div className="mt-6 h-px w-full bg-linear-to-r from-transparent via-zinc-700 to-transparent" />
 <div className="flex flex-wrap mt-10  justify-around gap-8 sm:gap-6 md:gap">
          <InfoBlock label="Nationality" value={actor.nationality} />

          <InfoBlock
            label="Born"
            value={formatDate(actor.dateOfBirth)}
          />

          <InfoBlock label="Debut" value={actor.debutYear} />

          <InfoBlock label="Movies" value={actor.movies?.length || 0} />

          <InfoBlock label="Series" value={actor.series?.length || 0} />
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
