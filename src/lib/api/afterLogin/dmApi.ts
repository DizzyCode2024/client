import { IDmRoom } from '@/types/dm';
import axiosInstance from '@/lib/api/afterLogin/axiosInstance';

export const createDmRoomApi = async ({ roomName, userNames }: IDmRoom) => {
  const response = await axiosInstance.post('/direct/rooms', {
    roomName,
    userNames,
  });
  return response.data;
};

export const getDmRooms = async () => {
  const response = await axiosInstance.get('/direct/rooms');
  return response.data;
};

export const deleteDmRoomApi = async (roomId: number) => {
  const response = await axiosInstance.delete(`/direct/rooms/${roomId}`);
  return response.data;
};

export const addMemberToRoomApi = async (roomId: number, username: string) => {
  const response = await axiosInstance.post(
    `/direct/rooms/${roomId}/members/${username}`,
  );
  return response.data;
};

export const removeMemberFromRoomApi = async (
  roomId: number,
  username: string,
) => {
  const response = await axiosInstance.delete(
    `/direct/rooms/${roomId}/members/${username}`,
  );
  return response.data;
};

export const fetchDmRoomDetailsApi = async (roomId: number) => {
  const response = await axiosInstance.get(`/direct/rooms/${roomId}`);
  return response.data;
};