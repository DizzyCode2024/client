import axiosInstance from '@/api/axiosInstance';
import { CategoryId, IChannel, RoomId } from '../types';

export const createChannel = async ({
  roomId,
  categoryId,
  channelName,
}: {
  roomId: RoomId;
  categoryId: CategoryId;
  channelName: string;
}): Promise<IChannel> => {
  const response = await axiosInstance.post(
    `/rooms/${roomId}/categories/${categoryId}/channels`,
    {
      channelName,
    },
  );
  return response.data;
};
