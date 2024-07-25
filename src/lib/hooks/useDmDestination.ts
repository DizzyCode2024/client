import useDmStore from '../stores/useDmStore';

export const useDmDestination = () => {
  const { currentDmRoom } = useDmStore();

  const ChannelTopic = `/topic/direct/room/${currentDmRoom?.roomId}`;
  const ChatDestination = `/app/direct/room/${currentDmRoom?.roomId}`;

  return { ChannelTopic, ChatDestination };
};
