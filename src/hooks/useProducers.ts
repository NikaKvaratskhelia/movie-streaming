import { useQuery } from "@tanstack/react-query";
import { getProducers } from "../services/producer-service";

export interface Producer {
  id: number;
  fullName: string;
  nationality: string;
  dateOfBirth: string;
  debutYear: number;
}

export const useProducers = () => {
  return useQuery({
    queryKey: ["producers"],
    queryFn: getProducers,
    staleTime: 1000 * 60 * 5,
  });
};
