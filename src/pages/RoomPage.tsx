import VoiceSection from '@/components/voice';
import useRoomStore from '@/lib/stores/useRoomStore';
import MainContainer from '@/components/shared/MainContainer';
import ChatSection from '@/components/chat';
import RoomMenu from '@/components/room/RoomMenu';

const RoomPage = () => {
  // const { roomId, channelId } = useParams<{
  //   roomId: string;
  //   channelId: string;
  // }>();

  const {
    currentChannelInfo: { type },
  } = useRoomStore();

  return (
    <MainContainer>
      <RoomMenu />
      {type === 'CHAT' ? <ChatSection /> : <VoiceSection />}
    </MainContainer>
  );
};

export default RoomPage;
