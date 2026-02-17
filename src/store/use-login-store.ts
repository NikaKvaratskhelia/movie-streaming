import { create } from "zustand";
import { logIn } from "../services/auth-service";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  login: (credentials: {
    email: string;
    password: string;
  }) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (credentials) => {
    set({ isLoading: true });

    try {
      const data = await logIn(credentials);

      localStorage.setItem("token", data.token);

      set({
        token: data.token,
        isAuthenticated: true,
        isLoading: false,
      });

      return { success: true };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Login failed";

      set({
        isLoading: false,
        token: null,
        isAuthenticated: false,
      });

      return { success: false, error: errorMessage };
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    set({
      token: null,
      isAuthenticated: false,
    });
  },
}));
