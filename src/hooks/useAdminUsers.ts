import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllUsersADMIN, deleteUserADMIN } from "@/src/services/user-service";
import { useAuthStore } from "@/src/store/useLoginStore";
import { toast } from "sonner";

export function useAdminUsers() {
  const { token } = useAuthStore();
  const queryClient = useQueryClient();

  const usersQuery = useQuery({
    queryKey: ["admin-users", token],
    queryFn: () => getAllUsersADMIN(token),
    enabled: !!token,
    staleTime: 1000 * 60 * 2,
  });

  const deleteMutation = useMutation({
    mutationFn: (userId: string) => deleteUserADMIN(token, userId),

    onSuccess: () => {
      toast.success("User deleted successfully");

      queryClient.invalidateQueries({
        queryKey: ["admin-users", token],
      });
    },

    onError: (err: Error) => {
      toast.error(err.message || "Failed to delete user");
    },
  });

  return {
    users: usersQuery.data ?? [],
    loading: usersQuery.isLoading,
    deleting: deleteMutation.isPending,

    refetchUsers: usersQuery.refetch,
    handleDeleteUser: deleteMutation.mutate,
  };
}
