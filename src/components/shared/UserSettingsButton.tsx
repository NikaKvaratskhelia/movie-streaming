export default function PasswordButton({
  text,
  disabled,
}: {
  text: string;
  disabled: boolean;
}) {
  return (
      <button
      disabled={disabled}
      className="
        w-full sm:w-auto
        px-5 py-2.5
        bg-[#E7C87E]
        rounded-[10px]
        text-black
        text-[14px]
        whitespace-nowrap
        disabled:opacity-50
        disabled:cursor-not-allowed
      "
    >
      {text}
    </button>
  );
}
