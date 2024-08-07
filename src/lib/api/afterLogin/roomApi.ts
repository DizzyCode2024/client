import {
  CategoryId,
  ChannelType,
  CreateRoomResponse,
  ICategory,
  ICatwChannel,
  IChannel,
  IRoom,
  RoomId,
} from '@/types';
import axiosInstance from './axiosInstance';

export const createRoom = async ({
  roomName,
  open,
}: {
  roomName: string;
  open: boolean;
}): Promise<CreateRoomResponse> => {
  const response = await axiosInstance.post('/rooms', { roomName, open });
  return response.data;
};

// 내 방 가져오기
export const getRooms = async (): Promise<IRoom[]> => {
  const response = await axiosInstance.get('/rooms');
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

// 방 삭제
export const deleteRoom = async (roomId: RoomId): Promise<void> => {
  await axiosInstance.delete(`/rooms/${roomId}`);
};

export const createChannel = async ({
  roomId,
  categoryId,
  channelName,
  channelType,
}: {
  roomId: RoomId;
  categoryId: CategoryId;
  channelName: string;
  channelType: ChannelType;
}): Promise<IChannel> => {
  const response = await axiosInstance.post(
    `/rooms/${roomId}/categories/${categoryId}/channels`,
    {
      channelName,
      channelType,
    },
  );
  return response.data;
};

export const createCategory = async ({
  roomId,
  categoryName,
}: {
  roomId: RoomId;
  categoryName: string;
}): Promise<ICategory> => {
  const response = await axiosInstance.post(`/rooms/${roomId}/categories`, {
    categoryName,
  });
  return response.data;
};

export const getCategories = async (
  roomId: RoomId,
): Promise<ICatwChannel[]> => {
  const response = await axiosInstance.get(`/rooms/${roomId}/categories`);
  return response.data;
};
