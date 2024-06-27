import axios from 'axios';
import { BASE_URL } from '@/utils/config';

export const getNewAccessToken = async () => {
  try {
    const response = await axios.post(
      `${BASE_URL}/reissue`,
      {},
      { withCredentials: true },
    );
    console.log(response);
    if (response.status === 200 && response.headers.authorization) {
      const newAccessToken = response.headers.authorization.split(' ')[1];
      localStorage.setItem('accessToken', newAccessToken);
      console.log('accessToken 발급 완료', newAccessToken);
      return newAccessToken;
    }
  } catch (error) {
    console.error('Error getting new access token', error);
    return null;
  }
  return null;
};
