import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AuthState } from "../features/auth/types";

export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      user: null,
      token: null,
      email: null,
      setUser: (user, email, token) => {
        set({ user, email, token });
      },

      clearUser: () => set({ user: null, email: null, token: null }),
    }),
    {
      name: "auth-storage",
    }
  )
);
