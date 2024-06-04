import axios from "axios";
import dayjs from "dayjs";
import { getNewAccessToken, getNewRefreshToken } from "../utils/jwt";

const BASE_URL = "http://localhost:5000";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    let accessToken = localStorage.getItem("accessToken");
    const accessExp = localStorage.getItem("accessExp");
    const refreshExp = localStorage.getItem("refreshExp");

    if (accessToken && accessExp && refreshExp) {
      const now = dayjs();

      // accessToken 만료 15분 전 재발급
      if (now.isAfter(dayjs.unix(Number(accessExp)).subtract(15, "minute"))) {
        accessToken = await getNewAccessToken();
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
      }

      // Refresh token 만료 3일 전 재발급
      if (now.isAfter(dayjs(refreshExp).subtract(3, "day"))) {
        await getNewRefreshToken();
      }
    }

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
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
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
