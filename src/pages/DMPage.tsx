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

  const { setCurrentDmId } = useDmStore();

  useEffect(() => {
    setCurrentDmId(roomIdParam);
  }, [roomIdParam, setCurrentDmId]);

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
