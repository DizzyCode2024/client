import useRoomStore from '@/lib/stores/useRoomStore';

export const useDestination = () => {
  const {
    currentChannelPath: { roomId, categoryId, channelId },
  } = useRoomStore();

  const ChannelTopic = `/topic/rooms.${roomId}.categories.${categoryId}.channels.${channelId}`;
  const ChatDestination = `/app/rooms.${roomId}.categories.${categoryId}.channels.${channelId}`;

  const VoiceTopic = `/video/call`;

  const StatusTopic = `/topic/rooms.${roomId}.status`;
  const StatusSend = `/app/rooms/${roomId}/status`;

  return { ChannelTopic, ChatDestination, VoiceTopic, StatusTopic, StatusSend };
};
