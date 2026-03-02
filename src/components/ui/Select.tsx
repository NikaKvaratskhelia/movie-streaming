"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function Select({
  label,
  valueId,
  options,
  onChange,
}: {
  label: string;
  valueId: number | null;
  options: { id: number; label: string }[];
  onChange: (id: number) => void;
}) {
  const [showOptions, setShowOptions] = useState(false);

  const selected = options.find((o) => o.id === valueId);

  return (
    <div className="relative w-full">
      <p className="text-sm text-neutral-400 mb-1">{label}</p>

      <div
        onClick={() => setShowOptions((prev) => !prev)}
        className="flex items-center justify-between bg-[#1a1e26] border border-[#2a2f3a] px-3 py-2 rounded-md cursor-pointer transition-all duration-150 hover:border-red-500/70 focus-within:border-red-500"
      >
        <span className="text-sm text-neutral-200">
          {selected?.label ?? "Select"}
        </span>

        <ChevronDown
          className={`w-4 h-4 text-neutral-400 rotate-0 transition-transform duration-200 ${
            showOptions ? "rotate-180" : ""
          }`}
        />
      </div>

      {showOptions && (
        <div className="absolute select-none z-50 mt-2 w-full bg-[#14161c] border border-[#2a2f3a] rounded-md shadow-lg overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150">
          {options.map((o) => {
            const isSelected = o.id === valueId;

            return (
              <button
                key={o.id}
                type="button"
                disabled={isSelected}
                onClick={() => {
                  if (!isSelected) {
                    onChange(o.id);
                    setShowOptions(false);
                  }
                }}
                className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                  isSelected
                    ? "bg-red-600/20 text-white cursor-not-allowed"
                    : "text-neutral-300 hover:bg-red-600/20 hover:text-white"
                }`}
              >
                {o.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
