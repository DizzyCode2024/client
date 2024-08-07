import { RoomId, IMember } from '@/types';
import axiosInstance from './axiosInstance';

export const getMembers = async (roomId: RoomId): Promise<IMember[]> => {
  const response = await axiosInstance.get(`/rooms/${roomId}/members`);
  return response.data;
};

export const postStatus = async (payload: IMember) => {
  const response = await axiosInstance.post('/members/status', payload);
  return response;
};
