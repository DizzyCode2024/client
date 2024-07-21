import { useAuthStore } from '@/lib/stores/useAuthStore';
import { BASE_URL } from '@/lib/utils/config';
import axios from 'axios';
import axiosInstance from './axiosInstance';

// getNewAccessToken
export const accessTokenApi = async () => {
  try {
    const response = await axios.post(
      `${BASE_URL}/reissue`,
      {},
      { withCredentials: true },
    );

    if (response.status === 200 && response.headers.authorization) {
      const newAccessToken = response.headers.authorization.split(' ')[1];
      localStorage.setItem('accessToken', newAccessToken);
      const currentUser = useAuthStore.getState().user;
      if (currentUser) {
        useAuthStore.getState().setUser(currentUser, newAccessToken);
      }
      return newAccessToken;
    }
  } catch (error) {
    console.error('Error getting new access token', error);
    return null;
  }
  return null;
};

// initialize
export const initializeAuthState = () => {
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

// secondary token
export const getSecondaryToken = async (): Promise<string | null> => {
  try {
    const response = await axiosInstance.get('/secondary-token');
    return response.data.secondaryToken;
  } catch (e) {
    console.error('error getting ST', e);
    return null;
  }
};

// fetchUserDetails
async function fetchUserDetails(token: string) {
  const response = await fetch('/members/detail', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error('Failed to fetch user details');
  return response.json();
}
