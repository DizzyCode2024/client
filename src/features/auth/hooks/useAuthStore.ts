import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AuthState } from "../types";

export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      user: null,
      token: null,
      setUser: (user, token) => set({ user, token }),
      clearUser: () => set({ user: null, token: null }),
    }),
    {
      name: "auth-storage",
    }
  )
);
