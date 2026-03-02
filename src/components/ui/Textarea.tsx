export default function Textarea({ label, id }: { label: string; id: string }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1">{label}</label>
      <textarea
        id={id}
        className="px-3 py-2 rounded-md w-full h-100px bg-[#1a1e26] border border-[#2a2f3a] hover:border-red-500/70 focus-within:border-red-500 outline-none transition-all duration-150"
      ></textarea>
    </div>
  );
}
