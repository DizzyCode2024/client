import { QUERY_KEYS } from '@/api/queryKeys';
import { spacing } from '@/constants/spacing';
import { IRoom } from '@/features/room/types';
import useRoomStore from '@/stores/useRoomStore';
import { Box, Input } from '@chakra-ui/react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { getAllRooms } from '../api/exploreApi';
import RoomBox from '../components/RoomBox';

const ExplorePage = () => {
  const { setCurrentChannel } = useRoomStore();
  useEffect(() => {
    setCurrentChannel({
      roomId: -1,
      categoryId: 0,
      channelId: 0,
    });
  }, [setCurrentChannel]);

  const { data: allRooms } = useQuery({
    queryKey: QUERY_KEYS.EXPLORE_ROOMS,
    queryFn: getAllRooms,
  });

  const queryClient = useQueryClient();
  const myRooms = queryClient.getQueryData<IRoom[]>(QUERY_KEYS.ROOMS);

  const allRoomsWithMembership = allRooms?.map((room) => ({
    ...room,
    isMember: myRooms?.some((myRoom) => myRoom.roomId === room.roomId),
  }));

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
        {allRoomsWithMembership?.map((room) => (
          <RoomBox
            key={room.roomId}
            roomId={room.roomId}
            roomName={room.roomName}
            open={room.open}
            isMember={room.isMember}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ExplorePage;
