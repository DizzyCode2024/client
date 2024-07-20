import useRoomStore from '@/lib/stores/useRoomStore';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo, useRef, useState } from 'react';
import { QUERY_KEYS } from '@/lib/api/afterLogin/queryKeys';
import { getCategories } from '@/lib/api/afterLogin/roomApi';
import UserBox from '@/components/userBox/UserBox';
import MenuContainer from '@/components/shared/MenuContainer';
import useStompClient from '@/lib/hooks/useStompClient';
import useSocketStore from '@/lib/stores/useSocketStore';
import { StompSubscription } from '@stomp/stompjs';
import { useDestination } from '@/lib/hooks/useDestination';
import { ICatwChannel, IMember, IRoom } from '@/types';
import CategoryBox from './CategoryBox';
import ChannelBox from './ChannelBox';
import RoomMenuButton from './RoomMenuButton';

const RoomMenu = () => {
  const queryClient = useQueryClient();
  const [currentRoomName, setCurrentRoomName] = useState<string>('');

  const rooms = useMemo(() => {
    return queryClient.getQueryData<IRoom[]>(QUERY_KEYS.ROOMS) || [];
  }, [queryClient]);

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

  // Subscribe room to get members' status
  const { isConnected, client } = useSocketStore();
  const { subscribe, unsubscribe } = useStompClient();
  const subscriptionRef = useRef<StompSubscription | null>(null);
  const { StatusTopic } = useDestination();

  useEffect(() => {
    if (isConnected && roomId && client) {
      const subscription = subscribe(StatusTopic, (message) => {
        console.log('Status:', message.body);
        const { username, status } = JSON.parse(message.body);
        queryClient.setQueryData<IMember[]>(
          QUERY_KEYS.MEMBERS(roomId),
          (oldData) => {
            if (!oldData) return oldData;

            const newData = oldData.map((member) => {
              if (member.username === username) {
                return { ...member, status };
              }
              return member;
            });

            return newData;
          },
        );
      });
      if (subscription) {
        subscriptionRef.current = subscription;
      } else {
        console.error(`Failed to subscribe to /app/rooms/${roomId}/status`);
      }
    }

    return () => {
      if (subscriptionRef.current) {
        unsubscribe(subscriptionRef.current);
        subscriptionRef.current = null;
      }
    };
  }, [isConnected, roomId, client, StatusTopic]);

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
