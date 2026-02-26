import { useQuery } from "@tanstack/react-query";
import { SeriesWithCount } from "@/src/types/SeriesWithCount";

interface ProducerDetails {
  id: number;
  fullName: string;
  nationality: string;
  dateOfBirth: string;
  debutYear: number;
  movies: [];
  series: SeriesWithCount[];
}

async function fetchProducerDetails(id: string): Promise<ProducerDetails> {
  const res = await fetch(`/api/producer/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch producer details");
  }

  const data = await res.json();

  if (!data.ok) {
    throw new Error(data.message);
  }

  return data.data;
}

export const useProducerDetails = (id: string | null) => {
  return useQuery({
    queryKey: ["producer", id],
    queryFn: () => {
      if (!id) throw new Error("Producer id is required");
      return fetchProducerDetails(id);
    },
    enabled: !!id, 
    staleTime: 1000 * 60 * 5, 
  });
};
