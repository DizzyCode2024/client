import { signout } from "@/utils/auth";
import axios from "axios";

interface IUseAuth {
  signin: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, username: string) => Promise<void>;
  signout: () => void;
}

export const useAuthActions = (): IUseAuth => {
  const signup = async (email: string, password: string, username: string) => {
    try {
      const response = await axios.post("/auth/signup", {
        email,
        password,
        username,
      });

      console.log("Signup successful:", response.data);
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  const signin = async (email: string, password: string) => {
    try {
      const response = await axios.post("/auth/login", { email, password });
      const accessToken = response.headers.authorization.split(" ")[1];
      localStorage.setItem("accessToken", accessToken);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return { signin, signup, signout };
};
