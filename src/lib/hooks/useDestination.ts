import useRoomStore from '@/lib/stores/useRoomStore';
import useDmStore from '@/lib/stores/useDmStore';

export const useDestination = () => {
  const {
    currentChannelPath: { roomId, categoryId, channelId },
  } = useRoomStore();
  const { currentDmRoom } = useDmStore();

  const ChannelTopic = `/topic/rooms.${roomId}.categories.${categoryId}.channels.${channelId}`;
  const ChatDestination = `/app/rooms.${roomId}.categories.${categoryId}.channels.${channelId}`;

  const DmRoomTopic = `/topic/direct/room/${currentDmRoom?.roomId}`;
  const DmDestination = `/app/direct/room/${currentDmRoom?.roomId}`;

  const VoiceTopic = `/video/call`;

  const StatusTopic = `/topic/rooms.${roomId}.status`;
  const StatusSend = `/app/rooms/${roomId}/status`;

  console.log(ChatDestination);

  return {
    ChannelTopic,
    ChatDestination,
    DmRoomTopic,
    DmDestination,
    VoiceTopic,
    StatusTopic,
    StatusSend,
  };
};
