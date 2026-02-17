interface ErrorComponentProps {
  error: string;
}

export default function ErrorComponent({ error }: ErrorComponentProps) {
  return (
    <div className="text-center py-8">
      <div className="text-red-500">Error: {error}</div>
    </div>
  );
}
