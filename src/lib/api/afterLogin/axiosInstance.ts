import { BASE_URL } from '@/lib/utils/config';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  withCredentials: true,
});

export default axiosInstance;
