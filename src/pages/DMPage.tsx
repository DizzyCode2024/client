import DMSection from '@/components/dm';
import useDmStore from '@/lib/stores/useDmStore';
import { Box } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const DMPage = () => {
  const param = useParams();
  const roomIdParam = param.id ? parseInt(param.id, 10) : 0;

  const { setCurrentDmId, dmRooms, setCurrentDmRoom } = useDmStore();

  useEffect(() => {
    setCurrentDmId(roomIdParam);
    const currentRoom = dmRooms.find((room) => room.roomId === roomIdParam);
    if (currentRoom) {
      setCurrentDmRoom(currentRoom);
    }
  }, [dmRooms, roomIdParam, setCurrentDmId, setCurrentDmRoom]);

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      width={'100%'}
      whiteSpace={'nowrap'}
    >
      <DMSection />
    </Box>
  );
};

export default DMPage;
