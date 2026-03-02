export default function Input({
  id,
  type,
  placeholder,
  value,
  min,
  max,
  label,
  onChange,
}: {
  id: string;
  type: string;
  label: string;
  placeholder: string;
  value: string;
  min?: number;
  max?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="flex flex-col w-full">
      <label
        htmlFor={id}
        className="text-white text-sm font-semibold cursor-pointer mb-1"
      >
        {label}
      </label>
      <input
        type={type}
        value={value}
        id={id}
        placeholder={placeholder}
        min={min}
        max={max}
        step="0.1"
        onChange={onChange}
        className="px-3 py-2 rounded-md bg-[#1a1e26] border border-[#2a2f3a] hover:border-red-500/70 focus-within:border-red-500 transition-all duration-150"
      />
    </div>
  );
}
