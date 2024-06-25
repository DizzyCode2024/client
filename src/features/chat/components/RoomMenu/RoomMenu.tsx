import useRoomStore from '@/stores/useRoomStore';
import { Box } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import UserBox from '../../../user/components/UserBox/UserBox';
import { getCategories } from '../../api/categoryApi';
import { getRooms } from '../../api/roomApi';
import { IRoom } from '../../types';
import CategoryBox from './CategoryBox';
import ChannelBox from './ChannelBox';
import RoomMenuButton from './RoomMenuButton';
import { QUERY_KEYS } from '../../api/queryKeys';

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
    queryKey: QUERY_KEYS.ROOMS,
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

  const { data: categories } = useQuery({
    queryKey: QUERY_KEYS.CATWCHANNELS(currentRoom),
    queryFn: () => getCategories(currentRoom),
  });

  useEffect(() => {
    console.log('categories:', categories);
  }, [categories]);

  return (
    <Container>
      <RoomMenuButton name={currentRoomName} />
      {categories?.map((category) => (
        <CategoryBox key={category.categoryId} name={category.categoryName}>
          {category?.channels?.map((channel) => (
            <ChannelBox key={channel.channelId} name={channel.channelName} />
          ))}
        </CategoryBox>
      ))}
      <UserBox />
    </Container>
  );
};

export default RoomMenu;
