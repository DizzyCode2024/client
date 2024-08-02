import { spacing } from '@/lib/constants';
import { Box, Heading } from '@chakra-ui/react';
import { useEffect } from 'react';
import useRoomStore from '@/lib/stores/useRoomStore';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS, getAllRooms } from '@/lib/api';
import { IRoom } from '@/types';
import RoomBox from './RoomBox';

const ExploreBody = () => {
  const { setCurrentChannelPath } = useRoomStore();
  useEffect(() => {
    setCurrentChannelPath({
      roomId: -1,
      categoryId: 0,
      channelId: 0,
    });
  }, [setCurrentChannelPath]);

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

  console.log(allRoomsWithMembership);

  return (
    <>
      <Heading ml={spacing.offset} size={'md'} color={'white'}>
        {'추천 커뮤니티'}
      </Heading>
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
    </>
  );
};

export default ExploreBody;
