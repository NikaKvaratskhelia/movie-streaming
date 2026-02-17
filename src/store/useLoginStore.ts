import { create } from "zustand";
import { persist } from "zustand/middleware";
import { logIn } from "../services/auth-service";

interface AuthState {
  token: string | null;
  hasHydrated: boolean;

  login: (credentials: {
    email: string;
    password: string;
  }) => Promise<{ success: boolean; error?: string }>;

  logout: () => void;

  setHasHydrated: (value: boolean) => void;
  setToken: (token: string | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      hasHydrated: false,

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

          return { success: false, error:"Error occured" };
        }
      },

      logout: () => set({ token: null }),
    }),
    {
      name: "auth-storage",

      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
