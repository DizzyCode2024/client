import useRoomStore from '@/lib/stores/useRoomStore';
import useDmStore from '@/lib/stores/useDmStore';

export const useDestination = () => {
  const {
    currentChannelPath: { roomId, categoryId, channelId },
  } = useRoomStore();
  const { currentDmId } = useDmStore();

  const ChannelTopic = `/topic/rooms.${roomId}.categories.${categoryId}.channels.${channelId}`;
  const ChatDestination = `/app/rooms.${roomId}.categories.${categoryId}.channels.${channelId}`;

  const DmRoomTopic = `/topic/direct.room.${currentDmId}`;
  const DmDestination = `/app.direct.room.${currentDmId}`;

  const DmCheckTopic = `/topic/direct.check.room`;

  const VoiceTopic = `/video/call`;

  const StatusTopic = `/topic/rooms.${roomId}.status`;
  const StatusSend = `/app/rooms/${roomId}/status`;

  return {
    ChannelTopic,
    ChatDestination,
    DmRoomTopic,
    DmDestination,
    DmCheckTopic,
    VoiceTopic,
    StatusTopic,
    StatusSend,
  };
};
