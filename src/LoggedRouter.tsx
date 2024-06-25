import { Box } from '@chakra-ui/react';
import { StompSubscription } from '@stomp/stompjs';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { Route, Routes } from 'react-router-dom';
import { getRooms } from './features/chat/api/roomApi';
import RoomList from './features/chat/components/RoomList/RoomList';
import useStompClient from './features/chat/hooks/useStompClient';
import DMPage from './features/chat/pages/DMPage';
import RoomPage from './features/chat/pages/RoomPage';
import { ChatMessage, IRoom } from './features/chat/types';
import { BASE_URL } from './utils/config';

const LoggedRouter = () => {
  // get rooms
  const { data: rooms } = useQuery<IRoom[], Error>({
    queryKey: ['rooms'],
    queryFn: getRooms,
  });

  // 웹소켓 연결
  const { isConnected, subscribe, unsubscribe } = useStompClient(
    `${BASE_URL}/ws/gs-guide-websocket`,
  );

  // rooms 구독
  const subscriptionsRef = useRef<Map<number, StompSubscription>>(new Map());
  useEffect(() => {
    if (rooms && isConnected) {
      const currentRoomIds = new Set(rooms.map((room) => room.roomId));
      const existingSubscriptions = subscriptionsRef.current;

      // 구독되지 않은 새로운 방 구독
      rooms.forEach((room) => {
        if (!existingSubscriptions.has(room.roomId)) {
          const subscription = subscribe(
            `/topic/rooms/${room.roomId}`,
            (message) => {
              const chatMessage: ChatMessage = JSON.parse(message.body);
              console.log(
                `Received message in room ${room.roomId}:`,
                chatMessage,
              );
              // 추가 설정
            },
          );
          if (subscription) {
            existingSubscriptions.set(room.roomId, subscription);
          }
        }
      });

      // 더 이상 존재하지 않는 방의 구독 해제
      existingSubscriptions.forEach((subscription, roomId) => {
        if (!currentRoomIds.has(roomId)) {
          unsubscribe(subscription);
          existingSubscriptions.delete(roomId);
        }
      });
    }

    // 연결이 끊어지면 모든 구독 해제
    if (!isConnected) {
      subscriptionsRef.current.forEach((subscription) => {
        unsubscribe(subscription);
      });
      subscriptionsRef.current.clear();
    }
    // return () => {
    //   subscriptionsRef.current.forEach((subscription) => {
    //     unsubscribe(subscription);
    //   });
    //   subscriptionsRef.current.clear();
    // };
  }, [rooms, isConnected, subscribe, unsubscribe]);

  return (
    <Box display={'flex'}>
      <RoomList />
      <Routes>
        <Route path={'/main'} element={<DMPage />} />
        <Route path={'/channels/:id'} element={<RoomPage />} />
      </Routes>
    </Box>
  );
};

export default LoggedRouter;
