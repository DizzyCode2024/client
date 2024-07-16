import useRoomStore from '@/lib/stores/useRoomStore';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { QUERY_KEYS } from '@/lib/api/afterLogin/queryKeys';
import { getCategories } from '@/lib/api/afterLogin/roomApi';
import UserBox from '@/components/userBox/UserBox';
import MenuContainer from '@/components/shared/MenuContainer';
import { ICatwChannel, IRoom } from '../../../types/room';
import CategoryBox from './CategoryBox';
import ChannelBox from './ChannelBox';
import RoomMenuButton from './RoomMenuButton';

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
    <MenuContainer>
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
    </MenuContainer>
  );
};

export default RoomMenu;
