import { Box } from '@chakra-ui/react';
import { Client, StompSubscription } from '@stomp/stompjs';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import SockJS from 'sockjs-client';
import RoomList from './components/room/RoomList';
import { QUERY_KEYS } from './lib/api/afterLogin/queryKeys';
import { getRooms } from './lib/api/afterLogin/roomApi';
import { getSecondaryToken } from './lib/api/afterLogin/token';
import useStompClient from './lib/hooks/useStompClient';
import { useAuthStore } from './lib/stores/useAuthStore';
import useSocketStore from './lib/stores/useSocketStore';
import { BROKER_URL } from './lib/utils/config';
import DMPage from './pages/DMPage';
import ExplorePage from './pages/ExplorePage';
import FriendPage from './pages/FriendPage';
import RoomPage from './pages/RoomPage';
import { IMember } from './types/member';
import { IRoom } from './types/room';

const LoggedRouter = () => {
  // secondary token
  const [ST, setST] = useState<string | null>(null);
  // get rooms
  const { data: rooms } = useQuery<IRoom[], Error>({
    queryKey: QUERY_KEYS.ROOMS,
    queryFn: getRooms,
  });

  // 웹소켓 연결
  const { client, setClient, isConnected, setIsConnected } = useSocketStore();
  const { subscribe, unsubscribe, sendMessage } = useStompClient();

  // get secondary token
  const getST = async () => {
    const token = await getSecondaryToken();
    setST(token);
  };

  useEffect(() => {
    getST();
    if (ST) {
      const socket = new SockJS(`${BROKER_URL}?token=${ST}`);
      const stompClient = new Client({
        webSocketFactory: () => socket,
        connectHeaders: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
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
    }

    return () => {
      console.log('deactivate');
      client?.deactivate();
      setClient(null);
      setST(null);
    };
  }, [setClient, setIsConnected, ST]);

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
            `/topic/rooms.${room.roomId}`,
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

  // update online status
  const username = useAuthStore((state) => state.user?.username);

  useEffect(() => {
    if (rooms && username && isConnected && client) {
      const payload: IMember = {
        username,
        status: 'online',
      };
      rooms.forEach((room) => {
        sendMessage(`/app/rooms/${room.roomId}/status`, payload);
      });
    }

    return () => {
      if (username) {
        const payload: IMember = {
          username,
          status: 'offline',
        };
        rooms?.forEach((room) => {
          sendMessage(`/app/rooms/${room.roomId}/status`, payload);
        });
      }
    };
  }, [rooms, isConnected, client, username]);

  return (
    <Box display={'flex'}>
      <RoomList />
      <Routes>
        <Route path={'/main'} element={<FriendPage />} />
        <Route path={'/main/:id'} element={<DMPage />} />
        <Route path={'/channels/:roomId/:channelId'} element={<RoomPage />} />
        <Route path={'/explore'} element={<ExplorePage />} />
      </Routes>
    </Box>
  );
};

export default LoggedRouter;
