import axiosInstance from '@/api/axiosInstance';
import { ICategory, ICatwChannel, RoomId } from '../types';

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
