import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { IAuthState, IUser } from '../../types/user';

export const useAuthStore = create(
  persist<IAuthState>(
    (set) => ({
      user: null,
      token: null,
      setUser: (user: IUser, token: string) => {
        set({ user, token });
      },
      clearUser: () => set({ user: null, token: null }),
    }),
    {
      name: 'auth-storage',
      onRehydrateStorage: () => (state) => {
        const token = localStorage.getItem('accessToken');
        if (state && token && state.user) {
          state.setUser(state.user, token);
        }
      },
    },
  ),
);
