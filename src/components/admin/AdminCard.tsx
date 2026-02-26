import Link from "next/link";

export default function AdminCard({
  text,
  count,
  href,
  addHref,
}: {
  text: string;
  count: string;
  href: string;
  addHref: string;
}) {
  return (
    <div
      className="group relative w-full max-w-[45%] rounded-3xl bg-linear-to-b flex flex-col from-[#1e1e2f] via-[#151521] to-[#0f0f17] p-7 text-white shadow-xl border border-white/10 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10"
    >
      <div className="flex items-start justify-between mb-10">
        <div>
          <h2 className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
            Total {text}
          </h2>
          <p className="mt-3 text-5xl font-bold leading-none tracking-tight bg-linear-to-r from-white to-white/70 bg-clip-text text-transparent">
            {count}
          </p>
        </div>

        <Link
          href={href}
          className="text-sm font-medium text-white/60 hover:text-blue-400 transition-colors duration-200 cursor-pointer"
        >
          View All →
        </Link>
      </div>

      <div className="h-px w-full bg-linear-to-r from-transparent via-white/10 to-transparent mb-6" />

      <Link
        href={addHref}
        className="w-full rounded-2xl bg-blue-600 hover:bg-blue-500 active:scale-[0.97] transition-all duration-200 py-3.5 font-semibold tracking-wide shadow-lg shadow-blue-600/25 hover:shadow-blue-500/40 cursor-pointer text-center"
      >
        + Add Product
      </Link>
    </div>
  );
}
