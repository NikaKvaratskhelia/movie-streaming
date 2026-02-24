interface ProducerListProps {
  producers: any[];
}

export default function ProducerList({ producers }: ProducerListProps) {
  if (producers.length === 0) {
    return (
      <div className="text-xl text-gray-400">No producers found</div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {producers.map((producer) => (
        <div
          key={producer.id}
          className="bg-gray-900 rounded-lg p-6 border border-gray-800 hover:border-gray-700 transition-colors"
        >
          <h2 className="text-2xl font-semibold mb-3 text-white">
            {producer.fullName}
          </h2>
          <div className="space-y-2 text-gray-300">
            <p><span className="text-gray-500">Nationality:</span> {producer.nationality}</p>
            <p><span className="text-gray-500">Date of Birth:</span> {new Date(producer.dateOfBirth).toLocaleDateString()}</p>
            <p><span className="text-gray-500">Debut Year:</span> {producer.debutYear}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
