import { QUERY_KEYS, getCategories } from '@/lib/api';
import { useDestination } from '@/lib/hooks/useDestination';
import useStompClient from '@/lib/hooks/useStompClient';
import useSocketStore from '@/lib/stores/useSocketStore';
import { ICatwChannel, IMember, IRoom, RoomId } from '@/types';
import { StompSubscription } from '@stomp/stompjs';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import CategoryBox from './CategoryBox';
import ChannelBox from './ChannelBox';
import RoomMenuButton from './RoomMenuButton';

const RoomMenu = ({ roomId }: { roomId: RoomId }) => {
  const queryClient = useQueryClient();

  const [currentRoomName, setCurrentRoomName] = useState<string>('');

  const rooms = queryClient.getQueryData<IRoom[]>(QUERY_KEYS.ROOMS) || [];

  const { data: categories } = useQuery<ICatwChannel[]>({
    queryKey: QUERY_KEYS.CATWCHANNELS(roomId),
    queryFn: () => getCategories(roomId),
    enabled: !!roomId,
  });
  console.log('categories', categories);
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
    <>
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
    </>
  );
};

export default RoomMenu;
