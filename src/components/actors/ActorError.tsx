interface ActorErrorProps {
  type: 'error' | 'not-found';
}

export default function ActorError({ type }: ActorErrorProps) {
  if (type === 'error') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Error Loading Actor</h2>
          <p className="text-gray-400">
            Failed to load actor details. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-white text-center">
        <h2 className="text-2xl font-bold mb-4">Actor Not Found</h2>
        <p className="text-gray-400">
          The actor you're looking for doesn't exist.
        </p>
      </div>
    </div>
  );
}
