import { QUERY_KEYS, getAllRooms } from '@/lib/api';
import { spacing } from '@/lib/constants';
import useRoomStore from '@/lib/stores/useRoomStore';
import { IRoom } from '@/types';
import { Box, Input } from '@chakra-ui/react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import RoomBox from '../components/explore/RoomBox';

const ExplorePage = ({
  setMenu,
}: {
  setMenu: React.Dispatch<React.SetStateAction<React.ReactNode>>;
}) => {
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

  useEffect(() => {
    setMenu(<div>{'Explore!'}</div>);
  }, []);

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
