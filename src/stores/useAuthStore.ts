import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { IAuthState, IUser } from '../features/auth/types';

export const useAuthStore = create(
  persist<IAuthState>(
    (set) => ({
      user: null,
      token: null,
      email: null,
      setUser: (user: IUser, token: string) => {
        set({ user, token });
      },
      setToken: (token: string) => {
        set({ token });
      },

      clearUser: () => set({ user: null, token: null }),
    }),
    {
      name: 'auth-storage',
      onRehydrateStorage: () => (state) => {
        const token = localStorage.getItem('accessToken');
        if (token && state) {
          state.setToken(token);
        }
      },
    },
  ),
);
