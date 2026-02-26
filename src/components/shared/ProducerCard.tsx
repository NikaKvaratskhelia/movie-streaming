import Link from "next/link";

interface ProducerCardProps {
  producer: {
    id: number;
    fullName: string;
    nationality: string;
    dateOfBirth: string;
    debutYear: number;
  };
}

export default function ProducerCard({ producer }: ProducerCardProps) {
  return (
    <Link
      href={`/producers/${producer.id}`}
      className="block"
    >
      <div className=" w-[300px] rounded-lg p-6 border-2 border-red-600 cursor-pointer">
        <h2 className="text-2xl font-semibold mb-3 text-white">
          {producer.fullName}
        </h2>
        <div className="space-y-2 text-gray-300">
          <p><span className="text-gray-500">Nationality:</span> {producer.nationality}</p>
          <p><span className="text-gray-500">Date of Birth:</span> {new Date(producer.dateOfBirth).toLocaleDateString()}</p>
          <p><span className="text-gray-500">Debut Year:</span> {producer.debutYear}</p>
        </div>
      </div>
    </Link>
  );
}
