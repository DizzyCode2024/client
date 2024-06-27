import useRoomStore from '@/stores/useRoomStore';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ChatSection from '../components/ChatSection/ChatSection';
import MainContainer from '../../../components/MainContainer';
import RoomMenu from '../components/RoomMenu/RoomMenu';

const RoomPage = () => {
  const { id: roomId } = useParams<{ id: string }>();

  const setCurrentRoom = useRoomStore((state) => state.setCurrentRoom);
  useEffect(() => {
    if (roomId) setCurrentRoom(parseInt(roomId, 10));
  }, [roomId, setCurrentRoom]);

  return (
    <MainContainer>
      <RoomMenu />
      <ChatSection />
    </MainContainer>
  );
};

export default RoomPage;
