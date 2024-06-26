import useRoomStore from '@/stores/useRoomStore';
import { Box } from '@chakra-ui/react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { QUERY_KEYS } from '@/api/queryKeys';
import UserBox from '../../../user/components/UserBox/UserBox';
import { getCategories } from '../../api/categoryApi';
import { ICatwChannel, IRoom } from '../../types';
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
  const queryClient = useQueryClient();
  const [currentRoomName, setCurrentRoomName] = useState<string>('');
  const rooms: IRoom[] =
    queryClient.getQueryData<IRoom[]>(QUERY_KEYS.ROOMS) || [];

  const {
    currentChannelPath: { roomId },
  } = useRoomStore();

  const { data: categories } = useQuery<ICatwChannel[]>({
    queryKey: QUERY_KEYS.CATWCHANNELS(roomId),
    queryFn: () => getCategories(roomId),
    enabled: !!roomId,
  });

  useEffect(() => {
    rooms?.forEach((room) => {
      if (room.roomId === roomId) {
        setCurrentRoomName(room.roomName);
      }
    });
  }, [roomId, rooms]);

  return (
    <Container>
      <RoomMenuButton name={currentRoomName} />
      {categories?.map((category) => (
        <CategoryBox
          key={category.categoryId}
          name={category.categoryName}
          categoryId={category.categoryId}
        >
          {category?.channels?.map((channel) => (
            <ChannelBox
              key={channel.channelId}
              channelId={channel.channelId}
              name={channel.channelName}
              type={channel.channelType}
              categoryId={category.categoryId}
            />
          ))}
        </CategoryBox>
      ))}
      <UserBox />
    </Container>
  );
};

export default RoomMenu;
