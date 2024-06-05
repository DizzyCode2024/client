import axiosInstance from "@/api/axiosInstance";
import { signout } from "./auth";

export const getNewAccessToken = async () => {
  try {
    const response = await axiosInstance.post("/auth/refresh");
    const newAccessToken = response.headers.authorization.split(" ")[1];
    localStorage.setItem("accessToken", newAccessToken);
    return newAccessToken;
  } catch (error) {
    console.error("Refresh token error:", error);
    signout();
    return null;
  }
};
