export default function BackButton() {
  return (
    <button
      onClick={() => window.history.back()}
      className="mb-6 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
      <span>Back</span>
    </button>
  );
}
