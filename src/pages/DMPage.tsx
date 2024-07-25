import MainContainer from '@/components/shared/MainContainer';
import { useParams } from 'react-router-dom';
import DMSection from '@/components/dm';
import { Box } from '@chakra-ui/react';
import useDmStore from '@/lib/stores/useDmStore';
import { useEffect } from 'react';
import DMList from '../components/dm/DMList';

const DMPage = () => {
  const param = useParams();
  const roomIdParam = param.id ? parseInt(param.id, 10) : 0;

  const { setCurrentDmId, dmRooms, setCurrentDmRoom } = useDmStore();

  useEffect(() => {
    console.log('dmRooms', dmRooms);
    setCurrentDmId(roomIdParam);
    const currentRoom = dmRooms.find((room) => room.roomId === roomIdParam);
    setCurrentDmRoom(currentRoom || null);
  }, [dmRooms, roomIdParam, setCurrentDmId, setCurrentDmRoom]);

  return (
    <MainContainer>
      <DMList />
      <Box
        display={'flex'}
        flexDirection={'column'}
        width={'100%'}
        whiteSpace={'nowrap'}
      >
        <DMSection />
      </Box>
    </MainContainer>
  );
};

export default DMPage;
