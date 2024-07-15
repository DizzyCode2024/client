import useRoomStore from '@/lib/stores/useRoomStore';

export const useDestination = () => {
  const {
    currentChannelPath: { roomId, categoryId, channelId },
  } = useRoomStore();

  const ChannelTopic = `/topic/rooms.${roomId}.categories.${categoryId}.channels.${channelId}`;
  const destination = `/app/rooms.${roomId}.categories.${categoryId}.channels.${channelId}`;

  const VoiceTopic = `/video/call`;

  return { ChannelTopic, destination, VoiceTopic };
};
