import useRoomStore from '@/stores/useRoomStore';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ChatSection from '../components/ChatSection/ChatSection';
import MainContainer from '../../../components/MainContainer';
import RoomMenu from '../components/RoomMenu/RoomMenu';

const RoomPage = () => {
  const { id: roomId } = useParams<{ id: string }>();

  const { setCurrentChannel } = useRoomStore();
  useEffect(() => {
    if (roomId)
      setCurrentChannel({
        roomId: parseInt(roomId, 10),
        categoryId: 0,
        channelId: 0,
      });
  }, [roomId, setCurrentChannel]);

  return (
    <MainContainer>
      <RoomMenu />
      <ChatSection />
    </MainContainer>
  );
};

export default RoomPage;
