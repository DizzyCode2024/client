import {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { useEffect } from 'react';
import { accessTokenApi } from '@/lib/api';
import { useAuthActions } from './useAuthActions';
import useStatusPayload from './status/useStatusPayload';

const useAxiosInterceptor = (instance: AxiosInstance) => {
  const { signout } = useAuthActions();
  const { offlinePayload } = useStatusPayload();

  const handleRequest = async (
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
  };

  const handleRequestError = (error: any) => {
    return Promise.reject(error);
  };

  const handleResponse = (response: AxiosResponse) => {
    return response;
  };

  const handleResponseError = async (error: any) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newAccessToken = await accessTokenApi();

      if (newAccessToken) {
        return instance({
          ...originalRequest,
          headers: {
            ...originalRequest.headers,
            Authorization: `Bearer ${newAccessToken}`,
          },
        });
      }
    } else if (error.response.status === 400) {
      await signout(offlinePayload);
    }
    return Promise.reject(error);
  };

  const setupInterceptors = () => {
    const requestInterceptor = instance.interceptors.request.use(
      handleRequest,
      handleRequestError,
    );
    const responseInterceptor = instance.interceptors.response.use(
      handleResponse,
      handleResponseError,
    );

    return { requestInterceptor, responseInterceptor };
  };

  const ejectInterceptors = (interceptors: {
    requestInterceptor: number;
    responseInterceptor: number;
  }) => {
    instance.interceptors.request.eject(interceptors.requestInterceptor);
    instance.interceptors.response.eject(interceptors.responseInterceptor);
  };

  useEffect(() => {
    const { requestInterceptor, responseInterceptor } = setupInterceptors();
    return () => ejectInterceptors({ requestInterceptor, responseInterceptor });
  }, []);
};

export default useAxiosInterceptor;
