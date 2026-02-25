import { Movie } from "@/generated/prisma/browser";

interface ProducerInfoProps {
  producer: {
    id: number;
    fullName: string;
    nationality: string;
    dateOfBirth: string | Date;
    debutYear: number;
    movies: Movie[];
  };
}

export default function ProducerInfo({ producer }: ProducerInfoProps) {
  return (
    <div className="bg-black border-2 border-red-600 rounded-lg p-8 mb-8">
      <h1 className="text-4xl font-bold mb-6">{producer.fullName}</h1>
      <div className="flex justify-around flex-wrap">
        <div>
          <span className="text-gray-500">Nationality:</span>
          <p className="text-lg">{producer.nationality}</p>
        </div>
        <div>
          <span className="text-gray-500">Date of Birth:</span>
          <p className="text-lg">
            {new Date(producer.dateOfBirth).toLocaleDateString()}
          </p>
        </div>
        <div>
          <span className="text-gray-500">Debut Year:</span>
          <p className="text-lg">{producer.debutYear}</p>
        </div>
        <div>
          <span className="text-gray-500">Total Movies:</span>
          <p className="text-lg">{producer.movies.length}</p>
        </div>
      </div>
    </div>
  );
}
