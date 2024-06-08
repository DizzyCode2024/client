import { signout } from "@/utils/auth";
import axios from "axios";

interface IUseAuth {
  signin: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, username: string) => Promise<void>;
  signout: () => void;
}

const BASE_URL = import.meta.env.VITE_BASE_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const useAuthActions = (): IUseAuth => {
  const signup = async (email: string, password: string, username: string) => {
    console.log(email);
    console.log(`${BASE_URL}/signup`);
    try {
      const response = await axiosInstance.post(`/signup`, {
        email,
        password,
        username,
      });

      console.log("Signup successful:", response);
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  const signin = async (email: string, password: string) => {
    console.log(email, password);
    try {
      const response = await axiosInstance.post(`/login`, {
        email,
        password,
      });

      console.log(response);
      const accessToken = response.headers.authorization.split(" ")[1];
      localStorage.setItem("accessToken", accessToken);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return { signin, signup, signout };
};
