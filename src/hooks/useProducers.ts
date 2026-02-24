import { useState, useEffect } from "react";
import { getProducers } from "../services/producer-service";

export const useProducers = () => {
  const [producers, setProducers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducers = async () => {
      try {
        const data = await getProducers();
        setProducers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch producers");
      } finally {
        setLoading(false);
      }
    };

    fetchProducers();
  }, []);

  return { producers, loading, error };
};
