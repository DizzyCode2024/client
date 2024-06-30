import useRoomStore from '@/stores/useRoomStore';

export const useDestination = () => {
  const {
    currentChannelPath: { roomId, categoryId, channelId },
  } = useRoomStore();

  const ChannelTopic = `/topic/rooms/${roomId}/categories/${categoryId}/channels/${channelId}`;
  const destination = `/app/rooms/${roomId}/categories/${categoryId}/channels/${channelId}`;
  return { ChannelTopic, destination };
};
