import { IRoom } from '@/types/room';
import axiosInstance from './axiosInstance';

// 모든 방 가져오기
export const getAllRooms = async (): Promise<IRoom[]> => {
  const response = await axiosInstance.get('/rooms/all');
  return response.data;
};
