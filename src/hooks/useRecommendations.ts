import { useQuery } from "@tanstack/react-query";
import { getRecommendations } from "../services/recommendation-services";
import { useAuthStore } from "../store/useLoginStore";

export function useRecommendations() {
  const { token } = useAuthStore();

  return useQuery({
    queryKey: ["recommendations", token],
    queryFn: () => getRecommendations(token),
    enabled: !!token,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    retry: 1,
  });
}
