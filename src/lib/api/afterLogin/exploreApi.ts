import { IRoom } from '@/types';
import axiosInstance from './axiosInstance';

// 모든 방 가져오기
export const getAllRooms = async (): Promise<IRoom[]> => {
  const response = await axiosInstance.get('/rooms/all');
  return response.data;
};

export const getRecommendations = async (value: string, k: number) => {
  const response = await axiosInstance.get(
    `/recommend?keyword=${value}&topN=${k}`,
  );
  return response.data;
};
