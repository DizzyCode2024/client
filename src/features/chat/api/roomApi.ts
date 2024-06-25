import axiosInstance from '../../../api/axiosInstance';
import { IRoom } from '../types';

export const createRoom = async (roomName: string): Promise<IRoom> => {
  const response = await axiosInstance.post('/rooms', { roomName });
  return response.data;
};

export const getRooms = async (): Promise<IRoom[]> => {
  const response = await axiosInstance.get('/rooms');
  return response.data;
};

export const deleteRoom = async (roomId: number): Promise<void> => {
  await axiosInstance.delete(`/rooms/${roomId}`);
};

export const getRoom = async (roomId: number): Promise<IRoom> => {
  const response = await axiosInstance.get(`/rooms/${roomId}/categories`);
  return response.data;
};
