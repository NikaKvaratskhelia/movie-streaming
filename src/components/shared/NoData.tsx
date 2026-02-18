export default function NoData({ message = "No movies available" }: { message?: string }) {
  return (
    <div className="text-center py-8">
      <div className="text-gray-400">{message}</div>
    </div>
  );
}
