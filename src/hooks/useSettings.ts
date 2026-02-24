import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getCurrentUser,
  updatePassword,
  updateProfileSettings,
} from "@/src/services/user-service";
import { useAuthStore } from "@/src/store/useLoginStore";
import { toast } from "sonner";

export function useSettings() {
  const { token } = useAuthStore();
  const queryClient = useQueryClient();

  const userQuery = useQuery({
    queryKey: ["currentUser", token],
    queryFn: () => getCurrentUser(token),
    initialData: [],
    enabled: !!token,
    staleTime: 1000 * 60 * 5,
  });

  const profileMutation = useMutation({
    mutationFn: (
      data: Partial<{
        firstName: string;
        lastName: string;
        email: string;
      }>,
    ) => updateProfileSettings(token, data),

    onSuccess: () => {
      toast.success("Profile updated successfully");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },

    onError: (err: Error) => {
      toast.error(err.message || "Failed to update profile");
    },
  });

  const passwordMutation = useMutation({
    mutationFn: (passwords: { oldPass: string; newPass: string }) =>
      updatePassword(token, passwords.oldPass, passwords.newPass),

    onSuccess: () => {
      toast.success("Password updated successfully");
    },

    onError: (err) => {
      toast.error(err.message ?? "Failed to update password");
    },
  });

  return {
    user: userQuery.data,
    loading: userQuery.isLoading,
    saving: profileMutation.isPending || passwordMutation.isPending,

    handleProfileUpdate: profileMutation.mutate,
    handlePasswordUpdate: passwordMutation.mutate,
  };
}
