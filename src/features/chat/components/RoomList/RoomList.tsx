import { Box, Divider, Stack, Text } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { getRooms } from '../../api/roomApi';
import { IRoom } from '../../types';
import AddRoomButton from './AddRoomButton';
import DMButton from './DMButton';
import RoomButton from './RoomButton';

const Container = ({ children }: { children: React.ReactNode }) => (
  <Box minWidth={'7.5rem'} height={'100vh'} bg={'gray.800'}>
    {children}
  </Box>
);

const RoomList = () => {
  const { data: rooms } = useQuery<IRoom[], Error>({
    queryKey: ['rooms'],
    queryFn: getRooms,
  });

  return (
    <Container>
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
            id={room.roomId}
            thumbnail={
              <Text fontSize={'2xl'}>{room.roomName.slice(0, 2)}</Text>
            }
            label={room.roomName}
          />
        ))}

        {/* Add Room */}
        <AddRoomButton />
      </Stack>
    </Container>
  );
};

export default RoomList;
