export default function PasswordButton({
  text,
  disabled,
}: {
  text: string;
  disabled: boolean;
}) {
  return (
    <button
      className="
        px-5 py-2.5
        bg-[#E7C87E]
        rounded-[10px]
        text-black
        text[14px]
      "
      disabled={disabled}
    >
      {text}
    </button>
  );
}
