import axios from "axios";

const BASE_URL = "http://localhost:5000";

export const getNewAccessToken = async (): Promise<string | null> => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/renew-at`, {
      refreshToken: localStorage.getItem("refreshToken"),
    });
    const { accessToken, accessExp } = response.data;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("accessExp", accessExp);
    return accessToken;
  } catch (error) {
    console.error("get new access token error", error);
    // 로그아웃 처리

    return null;
  }
};

export const getNewRefreshToken = async (): Promise<string | null> => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/renew-rt`, {
      refreshToken: localStorage.getItem("refreshToken"),
    });
    const { refreshToken, refreshExp } = response.data;
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("refreshExp", refreshExp);
    return refreshToken;
  } catch (error) {
    console.error("get new refresh token error", error);
    // 로그아웃 처리
    return null;
  }
};
