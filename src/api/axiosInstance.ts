import axios from "axios";
import { getNewAccessToken } from "../utils/jwt";
import { signout } from "@/utils/auth";
import { BASE_URL } from "@/utils/config";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  withCredentials: true, // 쿠키 포함
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newAccessToken = await getNewAccessToken();
      if (newAccessToken) {
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      }
    } else if (error.response.status === 400) {
      signout();
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
