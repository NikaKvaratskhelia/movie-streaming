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
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-[#6b6880] text-[12px]">
        {text}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        id={id}
        value={value}
        onChange={onChange}
        className="rounded-[10px] border-[#2B2B36] border-[1px]  text-white bg-[#1B1B27] px-3.5 py-2.5"
      />
    </div>
  );
}
