import MainContainer from '@/components/MainContainer';
import useRoomStore from '@/stores/useRoomStore';
import { Box } from '@chakra-ui/react';
import { useEffect } from 'react';

const ExplorePage = () => {
  const setCurrentRoom = useRoomStore((state) => state.setCurrentRoom);
  useEffect(() => {
    setCurrentRoom(-1);
  }, []);

  // const { data } = useQuery({
  //   queryKey: QUERY_KEYS.EXPLORE_ROOMS,
  //   queryFn: getAllRooms,
  // });

  return (
    <MainContainer>
      <Box bg={'gray.600'} flex={1}>
        <h1>{'Explore'}</h1>
      </Box>
    </MainContainer>
  );
};

export default ExplorePage;
