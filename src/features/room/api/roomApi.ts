import axiosInstance from '../../../api/axiosInstance';
import { IRoom, RoomId } from '../types';

export const createRoom = async ({
  roomName,
  isPrivate,
}: {
  roomName: string;
  isPrivate: boolean;
}): Promise<IRoom> => {
  const response = await axiosInstance.post('/rooms', { roomName, isPrivate });
  return response.data;
};

export const getRooms = async (): Promise<IRoom[]> => {
  const response = await axiosInstance.get('/rooms');
  return response.data;
};

export const deleteRoom = async (roomId: RoomId): Promise<void> => {
  await axiosInstance.delete(`/rooms/${roomId}`);
};