import { IDmRoom, RoomId } from '@/types/dm';
import axiosInstance from '@/lib/api/afterLogin/axiosInstance';

interface GetDmChatsProps {
  roomId: RoomId;
  timestamp?: string;
}

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

export const fetchDmRoomDetailsApi = async (
  roomId: RoomId,
): Promise<IDmRoom> => {
  const response = await axiosInstance.get(`/direct/rooms/${roomId}`);
  return response.data;
};

export const getDmChats = async ({ roomId, timestamp }: GetDmChatsProps) => {
  const params = timestamp ? { last: timestamp } : {};
  const response = await axiosInstance.get(`/direct/room/${roomId}/messages`, {
    params,
  });
  console.log(response);
  return response.data;
};
