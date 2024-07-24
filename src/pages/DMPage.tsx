import DMSection from '@/components/dm';
import MainContainer from '@/components/shared/MainContainer';
import useDmStore from '@/lib/stores/useDmStore';
import { Box } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DMList from '../components/dm/DMList';

const DMPage = () => {
  const param = useParams();
  const roomIdParam = param.id;

  const { currentDmChannelPath, setCurrentDmChannelPath } = useDmStore();

  useEffect(() => {
    if (roomIdParam && roomIdParam !== currentDmChannelPath.roomId.toString()) {
      setCurrentDmChannelPath({
        ...currentDmChannelPath,
        roomId: parseInt(roomIdParam, 10),
      });
    }
  }, [roomIdParam, currentDmChannelPath, setCurrentDmChannelPath]);

  return (
    <MainContainer>
      <DMList />
      <Box
        display={'flex'}
        flexDirection={'column'}
        width={'100%'}
        whiteSpace={'nowrap'}
      >
        <DMSection roomId={currentDmChannelPath.roomId} />
      </Box>
    </MainContainer>
  );
};

export default DMPage;
