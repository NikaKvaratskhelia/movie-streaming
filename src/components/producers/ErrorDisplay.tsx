interface ErrorDisplayProps {
  error: string | null;
}

export default function ErrorDisplay({ error }: ErrorDisplayProps) {
  if (!error) return null;

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-xl text-red-500">{error}</div>
    </div>
  );
}
