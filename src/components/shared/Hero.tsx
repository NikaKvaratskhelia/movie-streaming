export default function Hero({ text }: { text: string }) {
  return (
    <div className="flex justify-center items-center p-4.5 border-b-[3px] border-[#FFFFFF]">
      <p className="text-white text-[30px] font-bold">{text}</p>
    </div>
  );
}
