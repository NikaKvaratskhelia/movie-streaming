import { create } from "zustand";
import { User } from "@/generated/prisma/browser";
import { getCurrentUser } from "../services/user-service";

interface UserStore {
  user: User | null;
  fetchUser: (token: string) => Promise<void>;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,

  fetchUser: async (token) => {
    if (!token) return;

    try {
      const res = await getCurrentUser(token);
      set({ user: res.user });
    } catch (error) {
      console.error(error);
    }
  },
}));
