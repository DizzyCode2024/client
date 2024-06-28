import { spacing } from '@/constants/spacing';
import useRoomStore from '@/stores/useRoomStore';
import { Box, Input } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/api/queryKeys';
import RoomBox from '../components/RoomBox';
import { getAllRooms } from '../api/exploreApi';

const ExplorePage = () => {
  const setCurrentRoom = useRoomStore((state) => state.setCurrentRoom);
  useEffect(() => {
    setCurrentRoom(-1);
  }, []);

  const { data: allRooms } = useQuery({
    queryKey: QUERY_KEYS.EXPLORE_ROOMS,
    queryFn: getAllRooms,
  });

  return (
    <Box flex={1} bg={'gray.600'}>
      <Box mt={'8rem'} mb={spacing.offset} mx={'10rem'}>
        <Input
          variant={'filled'}
          placeholder={'Explore communities and join them!'}
          height={'5rem'}
          bg={'gray.700'}
          fontSize={'2xl'}
        />
      </Box>
      <Box
        flex={1}
        display={'grid'}
        gridTemplateColumns={'repeat(3, 1fr)'}
        gridAutoRows={'100px'}
        gap={'1rem'}
        padding={'5rem'}
      >
        {allRooms?.map((room) => (
          <RoomBox
            roomId={room.roomId}
            roomName={room.roomName}
            open={room.open}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ExplorePage;
