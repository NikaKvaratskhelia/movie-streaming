import { useEffect, useRef, useState } from "react";

interface Option {
  label: string;
  value: string;
}

interface DropdownProps {
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  placeholder?: string;
}

export function Dropdown({
  value,
  options,
  onChange,
  placeholder = "Select",
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "Escape") setOpen(false);
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen((o) => !o);
    }
  }

  return (
    <div ref={ref} className="relative w-44">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        onKeyDown={handleKey}
        className="
          w-full
          bg-zinc-900
          border border-zinc-700
          rounded-xl
          px-4 py-2.5
          text-sm
          text-white
          flex items-center justify-between
          hover:border-red-500
          focus:outline-none
          focus:ring-2 focus:ring-red-500/40
          transition cursor-pointer
        "
      >
        {selected?.label ?? placeholder}

        <svg
          className={`w-4 h-4 transition ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {open && (
        <ul
          className="
            absolute mt-2 w-full
            rounded-xl
            border border-zinc-700
            bg-black
            shadow-2xl
            overflow-hidden
            animate-in fade-in zoom-in-95
          "
        >
          {options.map((opt) => (
            <li
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className="
                px-4 py-2.5
                text-sm text-white
                hover:bg-red-600
                cursor-pointer
                transition
              "
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
