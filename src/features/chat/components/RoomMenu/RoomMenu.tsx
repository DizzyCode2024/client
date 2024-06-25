import { Box } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import useRoomStore from '@/stores/useRoomStore';
import UserBox from '../../../user/components/UserBox/UserBox';
import { getRooms } from '../../api/roomApi';
import { IRoom } from '../../types';
import CategoryBox from './CategoryBox';
import ChannelBox from './ChannelBox';
import RoomMenuButton from './RoomMenuButton';

const Container = ({ children }: { children: React.ReactNode }) => (
  <Box
    minWidth={'23rem'}
    height={'100vh'}
    bg={'gray.700'}
    display={'flex'}
    flexDirection={'column'}
  >
    {children}
  </Box>
);

const RoomMenu = () => {
  const { data: rooms } = useQuery<IRoom[], Error>({
    queryKey: ['rooms'],
    queryFn: getRooms,
  });
  const currentRoom = useRoomStore((state) => state.currentRoomId);

  const [currentRoomName, setCurrentRoomName] = useState<string>('');

  useEffect(() => {
    rooms?.forEach((room) => {
      if (room.roomId === currentRoom) {
        setCurrentRoomName(room.roomName);
      }
    });
  }, [currentRoom, rooms]);

  return (
    <Container>
      <RoomMenuButton name={currentRoomName} />
      <CategoryBox name={'채팅 채널'}>
        <ChannelBox name={'채널 1'} />
        <ChannelBox name={'채널 2'} />
      </CategoryBox>
      <UserBox />
    </Container>
  );
};

export default RoomMenu;
