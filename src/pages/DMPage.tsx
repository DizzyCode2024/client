import { Box } from '@chakra-ui/react';
import MainContainer from '@/components/shared/MainContainer';
import useDmStore from '@/lib/stores/useDmStore';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import DMSection from '@/components/dm';
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
  console.log(currentDmChannelPath);
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
