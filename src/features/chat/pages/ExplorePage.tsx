import { Box } from '@chakra-ui/react';
import useRoomStore from '@/stores/useRoomStore';
import { useEffect } from 'react';
import MainContainer from '../components/MainContainer';

const ExplorePage = () => {
  const setCurrentRoom = useRoomStore((state) => state.setCurrentRoom);
  useEffect(() => {
    setCurrentRoom(-1);
  }, []);
  return (
    <MainContainer>
      <Box bg={'gray.600'} flex={1}>
        <h1>{'Explore'}</h1>
      </Box>
    </MainContainer>
  );
};

export default ExplorePage;
