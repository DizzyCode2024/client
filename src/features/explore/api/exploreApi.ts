import axiosInstance from '@/api/axiosInstance';
import { IRoom } from '@/features/room/types';

// 모든 방 가져오기
export const getAllRooms = async (): Promise<IRoom[]> => {
  const response = await axiosInstance.get('/explore');
  return response.data;
};

// 방 들어가기
export const enterRoom = async (roomId: number): Promise<void> => {
  const response = await axiosInstance.post(`/rooms/${roomId}/in`);
  return response.data;
};

// 방 나가기
export const leaveRoom = async (roomId: number): Promise<void> => {
  const response = await axiosInstance.delete(`/rooms/${roomId}/out`);
  return response.data;
};
