import axios from "axios";
import { BASE_URL } from "@/utils/config";

export const getNewAccessToken = async () => {
  try {
    const response = await axios.post(
      `${BASE_URL}/reissue`,
      {},
      { withCredentials: true }
    );
    if (response.status === 200) {
      const newAccessToken = response.data.accessToken;
      localStorage.setItem("accessToken", newAccessToken);
      return newAccessToken;
    }
  } catch (error) {
    console.error("Error getting new access token", error);
    return null;
  }
};
