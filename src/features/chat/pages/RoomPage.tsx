import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import useRoomStore from '@/stores/useRoomStore';
import { useEffect } from 'react';
import ChatSection from '../components/ChatSection/ChatSection';
import RoomMenu from '../components/RoomMenu/RoomMenu';

const Container = styled.div`
  /* temporary */
  width: 100%;
  display: flex;
  background-color: ${({ theme }) => theme.colors.textDim};
`;

const RoomPage = () => {
  const { id: roomId } = useParams<{ id: string }>();

  const setCurrentRoom = useRoomStore((state) => state.setCurrentRoom);
  useEffect(() => {
    if (roomId) setCurrentRoom(parseInt(roomId, 10));
  }, [roomId, setCurrentRoom]);

  return (
    <Container>
      <RoomMenu />
      <ChatSection />
    </Container>
  );
};

export default RoomPage;
