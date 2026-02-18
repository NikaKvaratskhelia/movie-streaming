export default function StatisticsDiv({
  text,
  heading,
  label,
}: {
  text: string;
  heading: string;
  label: string;
}) {
  return (
    <div className="w-60 p-6 border border-white/20 rounded-2xl text-white bg-white/5 backdrop-blur-sm select-none">
      <h2 className="text-[16px] uppercase font-medium text-white/70">
        {heading}
      </h2>

      <div className="mt-3 space-y-1">
        <p className="text-lg font-medium">
          {text}
        </p>
        <p className="text-sm text-white/60">
          {label}
        </p>
      </div>
    </div>
  );
}
