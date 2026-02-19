import { create } from "zustand";
import { persist } from "zustand/middleware";
import { logIn } from "../services/auth-service";
import { User } from "@/generated/prisma/browser";
import { getCurrentUser } from "../services/user-service";

interface AuthState {
  token: string | null;
  user: User | null;
  hasHydrated: boolean;
  fetching: boolean;

  login: (credentials: {
    email: string;
    password: string;
  }) => Promise<{ success: boolean; error?: string }>;

  logout: () => void;
  fetchUser: (token: string) => void;

  setHasHydrated: (value: boolean) => void;
  setToken: (token: string | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      hasHydrated: false,
      user: null,
      fetching: false,

      setHasHydrated: (value) => set({ hasHydrated: value }),

      setToken: (token) => set({ token }),

      login: async (credentials) => {
        try {
          const response = await logIn(credentials);

          if (response.token) {
            set({ token: response.token });
            return { success: true };
          }

          return { success: false, error: "Invalid credentials" };
        } catch (error) {
          if (error instanceof Error) {
            return { success: false, error: error.message };
          }

          return { success: false, error: "Error occured" };
        }
      },

      logout: () => set({ token: null, user: null }),

      fetchUser: async (token) => {
        set({ fetching: true });
        const current = get().user;
        if (current) return;

        try {
          const res = await getCurrentUser(token);
          set({ user: res.user });
        } catch (error) {
          console.error(error);
        }

        set({ fetching: false });
      },
    }),

    {
      name: "auth-storage",
      partialize: (state) => ({ token: state.token, user: state.user }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
