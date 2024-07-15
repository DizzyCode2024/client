import { useAuthStore } from '@/lib/stores/useAuthStore';
import { BASE_URL } from '@/lib/utils/config';
import axios from 'axios';

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
      console.log('accessToken 발급 완료', newAccessToken);
      return newAccessToken;
    }
  } catch (error) {
    console.error('Error getting new access token', error);
    return null;
  }
  return null;
};
