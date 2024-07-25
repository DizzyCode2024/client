import { IDmRoom, RoomId } from '@/types/dm';
import axiosInstance from '@/lib/api/afterLogin/axiosInstance';

interface GetDmChatsProps {
  dmRoomId: RoomId;
  timestamp: string;
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
  console.log('response', response);
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

export const getDmChats = async ({ dmRoomId, timestamp }: GetDmChatsProps) => {
  const params = timestamp ? { last: timestamp } : {};
  console.log('timestamp', timestamp);
  console.log('dRI', dmRoomId);
  const response = await axiosInstance.get(`/direct/room/1/messages`, {
    params,
  });
  console.log(response);
  return response.data;
};
