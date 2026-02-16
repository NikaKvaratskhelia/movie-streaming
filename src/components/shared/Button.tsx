export default function Button({
  text,
  disabled,
}: {
  text: string;
  disabled: boolean;
}) {
  return (
    <button
      className="
        text-center self-center
        rounded-[20px]
        border border-[#EFEFEF]
        bg-linear-to-r
        from-[rgba(221,122,5,0.8)]
        to-[rgba(236,25,164,0.8)]
        max-w-50 w-[90%]
        text-white font-semibold py-2
        cursor-pointer
        transition-all duration-300 ease-in-out
        hover:brightness-120
        hover:scale-[1.03]
        hover:shadow-lg
        active:scale-[0.98]
        disabled:cursor-not-allowed
        disabled:bg-amber-50
      "
      disabled={disabled}
    >
      {text}
    </button>
  );
}
