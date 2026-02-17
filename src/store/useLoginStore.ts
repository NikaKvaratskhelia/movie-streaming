import { create } from "zustand";
import { logIn } from "../services/auth-service";

interface AuthState {
  token: string | null;
  login: (credentials: {
    email: string;
    password: string;
  }) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,

  login: async (credentials) => {
    try {
      const data = await logIn(credentials);

      localStorage.setItem("token", data.token);

      set({ token: data.token });

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Login failed",
      };
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ token: null });
  },
}));
