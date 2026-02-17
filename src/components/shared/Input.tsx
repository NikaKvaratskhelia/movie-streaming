export default function Input({
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
      <label htmlFor={id} className="text-white text-[20px]">
        {text}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        id={id}
        value={value}
        onChange={onChange}
        className="border border-[#EFEFEF] rounded-3xl px-8 py-3 text-white outline-0"
      />
    </div>
  );
}
