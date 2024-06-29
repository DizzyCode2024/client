import { Box } from '@chakra-ui/react';
import { Client, StompSubscription } from '@stomp/stompjs';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { Route, Routes } from 'react-router-dom';
import SockJS from 'sockjs-client';
import { QUERY_KEYS } from './api/queryKeys';
import ExplorePage from './features/explore/pages/ExplorePage';
import { getRooms } from './features/room/api/roomApi';
import RoomList from './features/room/components/RoomList/RoomList';
import useStompClient from './features/room/hooks/useStompClient';
import DMPage from './features/room/pages/DMPage';
import RoomPage from './features/room/pages/RoomPage';
import { IRoom } from './features/room/types';
import { BROKER_URL } from './utils/config';
import useSocketStore from './stores/useSocketStore';

const LoggedRouter = () => {
  // get rooms
  const { data: rooms } = useQuery<IRoom[], Error>({
    queryKey: QUERY_KEYS.ROOMS,
    queryFn: getRooms,
  });

  // 웹소켓 연결
  const { client, setClient, isConnected, setIsConnected } = useSocketStore();
  const { subscribe, unsubscribe } = useStompClient();
  useEffect(() => {
    const socket = new SockJS(BROKER_URL);
    const stompClient = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        setIsConnected(true);
        console.log(`Connected to server ${BROKER_URL}`);
      },
      onDisconnect: () => {
        setIsConnected(false);
        console.log('Disconnected from server');
      },
      debug: (str) => {
        console.log(`STOMP Debug: ${str}`);
      },
    });
    stompClient.activate();
    setClient(stompClient);

    return () => {
      stompClient.deactivate();
      setClient(null);
    };
  }, []);

  // rooms 구독
  const subscriptionsRef = useRef<Map<number, StompSubscription>>(new Map());
  useEffect(() => {
    if (rooms && isConnected && client) {
      const currentRoomIds = new Set(rooms.map((room) => room.roomId));
      const existingSubscriptions = subscriptionsRef.current;

      // 구독되지 않은 새로운 방 구독
      rooms.forEach((room) => {
        if (!existingSubscriptions.has(room.roomId)) {
          const subscription = subscribe(
            `/topic/rooms/${room.roomId}`,
            (message) => {
              const chatMessage = JSON.parse(message.body);
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
  }, [rooms, isConnected, subscribe, unsubscribe, client]);

  return (
    <Box display={'flex'}>
      <RoomList />
      <Routes>
        <Route path={'/main'} element={<DMPage />} />
        <Route path={'/channels/:id'} element={<RoomPage />} />
        <Route path={'/explore'} element={<ExplorePage />} />
      </Routes>
    </Box>
  );
};

export default LoggedRouter;
