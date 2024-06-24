import axios from "axios";
import { BASE_URL } from "@/utils/config";

const signupAxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  withCredentials: true,
});

export default signupAxiosInstance;
