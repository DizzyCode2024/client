import axiosInstance from '@/api/axiosInstance';
import { CategoryId, ChannelId, RoomId } from '@/features/room/types';

interface getChatsProps {
  roomId: RoomId;
  categoryId: CategoryId;
  channelId: ChannelId;
  timestamp: string | null;
}

export const getChats = async ({
  roomId,
  categoryId,
  channelId,
  timestamp,
}: getChatsProps) => {
  const params = timestamp ? { last: timestamp } : {};

  const response = await axiosInstance.get(
    `/rooms/${roomId}/categories/${categoryId}/channels/${channelId}/messages`,
    { params },
  );

  // console.log('==', params, response.data);

  return response.data;
};
