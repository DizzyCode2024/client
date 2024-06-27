import axiosInstance from '@/api/axiosInstance';
import { CategoryId, ChannelType, IChannel, RoomId } from '../types';

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
