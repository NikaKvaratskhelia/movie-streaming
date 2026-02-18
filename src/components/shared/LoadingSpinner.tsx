export default function LoadingSpinner() {
  return (
    <div className="text-center py-8">
      <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      <p className="mt-2 text-white">Loading movies...</p>
    </div>
  );
}
