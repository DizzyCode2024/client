import axiosInstance from './axiosInstance';

// getNewAccessToken
// initialize

// secondary token
export const getSecondaryToken = async (): Promise<string | null> => {
  try {
    const response = await axiosInstance.get('/secondary-token');
    return response.data.secondaryToken;
  } catch (e) {
    console.error('error getting ST', e);
    return null;
  }
};
