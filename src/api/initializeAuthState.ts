import { useAuthStore } from '@/stores/useAuthStore';

const initializeAuthState = () => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const isTokenExpired = payload.exp * 1000 < Date.now();

    if (!isTokenExpired) {
      useAuthStore.getState().setToken(token);
    } else {
      useAuthStore.getState().clearUser();
      localStorage.removeItem('accessToken');
    }
  } else {
    useAuthStore.getState().clearUser();
  }
};

export default initializeAuthState;
