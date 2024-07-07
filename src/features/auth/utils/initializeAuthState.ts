import { useAuthStore } from '@/stores/useAuthStore';

const initializeAuthState = () => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const isTokenExpired = payload.exp * 1000 < Date.now();

    if (!isTokenExpired) {
      fetchUserDetails(token).then((userDetails) => {
        useAuthStore.getState().setUser(userDetails, token);
      });
    } else {
      useAuthStore.getState().clearUser();
      localStorage.removeItem('accessToken');
    }
  } else {
    useAuthStore.getState().clearUser();
  }
};

export default initializeAuthState;

async function fetchUserDetails(token: string) {
  const response = await fetch('/members/detail', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error('Failed to fetch user details');
  return response.json();
}
