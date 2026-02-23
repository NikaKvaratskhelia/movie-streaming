export default function PasswordInput({
  type,
  text,
  id,
  placeholder,
  value,
  onChange,
}: {
  type: string;
  text: string;
  id: string;
  placeholder: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label
        htmlFor={id}
        className="text-[#6b6880] text-xs sm:text-sm"
      >
        {text}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        id={id}
        value={value}
        onChange={onChange}
        className="
          w-full
          rounded-[10px]
          border border-[#2B2B36]
          text-white
          bg-[#1B1B27]
          px-3 py-2
          sm:px-3.5 sm:py-2.5
          text-sm sm:text-base
          outline-none
          focus:border-purple-500
          focus:ring-1 focus:ring-purple-500
          transition
        "
      />
    </div>
  );
}