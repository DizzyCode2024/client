import useRoomStore from '@/lib/stores/useRoomStore';
import useDmStore from '@/lib/stores/useDmStore';

export const useDestination = () => {
  const {
    currentChannelPath: { roomId, categoryId, channelId },
  } = useRoomStore();
  const { currentDmId, currentFriend } = useDmStore();

  const ChannelTopic = `/topic/rooms.${roomId}.categories.${categoryId}.channels.${channelId}`;
  const ChatDestination = `/app/rooms.${roomId}.categories.${categoryId}.channels.${channelId}`;

  const DmRoomTopic = `/topic/direct.room.${currentDmId}`;
  const DmDestination = `/app/direct.room.${currentDmId}`;

  const DmCheckTopic = `/topic/direct.check.room`;

  const VoiceTopic = `/video/call`;

  const StatusTopic = `/topic/rooms.${roomId}.status`;
  const StatusSend = `/app/rooms/${roomId}/status`;

  let FriendStatus = '';
  if (currentFriend) {
    FriendStatus = `/friendship.${currentFriend.friendId}.status`;
  }
  // const OnlineFriendRenewal = `/friendship/status/member1/${memberId1}/member2/${memberId2}`;

  return {
    ChannelTopic,
    ChatDestination,
    DmRoomTopic,
    DmDestination,
    DmCheckTopic,
    VoiceTopic,
    StatusTopic,
    StatusSend,
    FriendStatus,
  };
};
