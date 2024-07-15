import VoiceSection from '@/features/chat/components/Voice';
import useRoomStore from '@/stores/useRoomStore';
import MainContainer from '../../../components/MainContainer';
import ChatSection from '../../chat/components/Chat';
import RoomMenu from '../components/RoomMenu/RoomMenu';

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
