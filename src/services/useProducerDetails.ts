import { useState, useEffect } from "react";
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

export const useProducerDetails = (id: string | null) => {
  const [producer, setProducer] = useState<ProducerDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchProducerDetails = async () => {
      try {
        const res = await fetch(`/api/producer/${id}`);
        
        if (!res.ok) {
          throw new Error("Failed to fetch producer details");
        }

        const data = await res.json();

        if (!data.ok) {
          throw new Error(data.message);
        }

        setProducer(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch producer details");
      } finally {
        setLoading(false);
      }
    };

    fetchProducerDetails();
  }, [id]);

  return { producer, loading, error };
};
