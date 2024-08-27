import { QUERY_KEYS } from '@/lib/api';
import { IRoom } from '@/types';
import { Box, Divider, Stack, Text } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import AddRoomButton from './AddRoomButton';
import DMButton from './DMButton';
import ExploreButton from './ExploreButton';
import RoomButton from './RoomButton';

const RoomList = () => {
  const queryClient = useQueryClient();
  const rooms: IRoom[] =
    queryClient.getQueryData<IRoom[]>(QUERY_KEYS.ROOMS) || [];

  return (
    <Box
      minWidth={'4rem'}
      bg={'gray.800'}
      overflowY={'scroll'}
      height={'100vh'}
      sx={{
        '::-webkit-scrollbar': {
          display: 'none',
        },
      }}
    >
      <Stack
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        mt={2}
      >
        {/* DM */}
        <DMButton />

        <Divider borderColor={'gray.500'} w={'3rem'} />

        {/* Room */}

        {rooms?.map((room) => (
          <RoomButton
            key={room.roomId}
            roomId={room.roomId}
            thumbnail={<Text fontSize={'md'}>{room.roomName.slice(0, 2)}</Text>}
            label={room.roomName}
          />
        ))}

        {/* Add Room */}
        <AddRoomButton />

        {/* Explore Rooms */}
        <ExploreButton />
      </Stack>
    </Box>
  );
};

export default RoomList;
