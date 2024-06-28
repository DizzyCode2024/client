import { useAuthStore } from '@/stores/useAuthStore';

const initializeAuthState = () => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    useAuthStore.getState().setToken(token);
  } else {
    useAuthStore.getState().clearUser();
  }
};
export default initializeAuthState;
