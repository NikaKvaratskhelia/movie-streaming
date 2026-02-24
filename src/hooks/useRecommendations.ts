import { useQuery } from "@tanstack/react-query";
import { getRecommendations } from "../services/recommendation-services";
import { useAuthStore } from "../store/useLoginStore";

export function useRecommendations() {
  const { token } = useAuthStore();

  const recommendationQuery = useQuery({
    queryKey: ["recommendations", token],
    queryFn: () => getRecommendations(token),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    retry: 1,
  });

  return {
    data: recommendationQuery.data,
    isLoading: recommendationQuery.isFetching,
  };
}
