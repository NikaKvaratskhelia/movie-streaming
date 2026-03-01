import { ReactNode } from "react";

type CardProps = {
  label: string;
  count: number;
  icon: ReactNode;
};

export default function StatisticCard({ label, count, icon }: CardProps) {
  return (
    <div className="bg-[#14161c] rounded-lg p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-[#737b8c] font-medium">{label}</p>
          <p className="text-3xl font-display font-bold mt-1 text-[#edebe9]">
            {count}
          </p>
        </div>
        <div className="p-2.5 rounded-lg bg-red-600/20 text-red-700">{icon}</div>
      </div>
    </div>
  );
}
