import axios, { InternalAxiosRequestConfig } from 'axios';
import { signout } from '@/utils/auth';
import { BASE_URL } from '@/utils/config';
import { getNewAccessToken } from '../utils/jwt';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  withCredentials: true, // 쿠키 포함
});

axiosInstance.interceptors.request.use(
  async (
    config: InternalAxiosRequestConfig,
  ): Promise<InternalAxiosRequestConfig> => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      return {
        ...config,
        headers: {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        } as any,
      };
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newAccessToken = await getNewAccessToken();
      if (newAccessToken) {
        return axiosInstance({
          ...originalRequest,
          headers: {
            ...originalRequest.headers,
            Authorization: `Bearer ${newAccessToken}`,
          },
        });
      }
    }
    if (error.response.status === 500 && !originalRequest._retry) {
      console.log('Handling 500 error - attempting to refresh token');
      originalRequest._retry = true;
      delete originalRequest.headers.Authorization;
      const newAccessToken = await getNewAccessToken(); // 토큰 재발급 받기
      if (newAccessToken) {
        localStorage.setItem('accessToken', newAccessToken);
        return axiosInstance({
          ...originalRequest,
          headers: {
            ...originalRequest.headers,
            Authorization: `Bearer ${newAccessToken}`,
          },
        });
      }
    } else if (error.response.status === 400) {
      signout();
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
