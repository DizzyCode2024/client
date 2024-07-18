import { RoomId } from '@/types/room';
import { IMember } from '@/types/member';
import axiosInstance from './axiosInstance';

export const getMembers = async (roomId: RoomId): Promise<IMember[]> => {
  const response = await axiosInstance.get(`rooms/${roomId}/members`);
  return response.data;
};
