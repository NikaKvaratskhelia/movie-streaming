
export default function AdminCard({
  text,
  count,
}: {
  text: string;
  count: string;
}) {
  return (
    <div className="w-70 flex flex-col p-5 rounded-[10px] bg-[#13131A]">
      <h2 className="text-[14px] font-medium uppercase tracking-[0.2em] text-white/40">
        Total {text}
      </h2>
      <p className="mt-3 text-[24px] font-bold leading-none tracking-tight bg-linear-to-r from-white to-white/70 bg-clip-text text-transparent">
        {count}
      </p>
    </div>
  );
}
