import GlobalMenu from '@/components/GlobalMenu';
import {
  QUERY_KEYS,
  axiosInstance,
  getRooms,
  getSecondaryToken,
} from '@/lib/api';
import useHeartbeat from '@/lib/hooks/status/useHeartbeat';
import useStatusPayload from '@/lib/hooks/status/useStatusPayload';
import useAxiosInterceptor from '@/lib/hooks/useAxiosInterceptor';
import useStompClient from '@/lib/hooks/useStompClient';
import useSocketStore from '@/lib/stores/useSocketStore';
import { BROKER_URL } from '@/lib/utils/config';
import DMPage from '@/pages/DMPage';
import ExplorePage from '@/pages/ExplorePage';
import FriendPage from '@/pages/FriendPage';
import RoomPage from '@/pages/RoomPage';
import { IRoom } from '@/types';
import { Box } from '@chakra-ui/react';
import { Client, StompSubscription } from '@stomp/stompjs';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import SockJS from 'sockjs-client';
import RoomList from '../components/room/RoomList';

const LoggedRouter = () => {
  const globalMenu = useMemo(() => <GlobalMenu />, []);

  // set up axiosInstance
  const interceptor = useAxiosInterceptor(axiosInstance);

  // secondary token
  const [ST, setST] = useState<string | null>(null);
  // get rooms
  const { data: rooms } = useQuery<IRoom[], Error>({
    queryKey: QUERY_KEYS.ROOMS,
    queryFn: getRooms,
  });

  // const { data: friends } = useQuery({
  //   queryKey: ['dmRooms'],
  //   queryFn: getDmRooms,
  // });

  // console.log('>>>>', friends);

  // 웹소켓 연결
  const { client, setClient, isConnected, setIsConnected } = useSocketStore();
  const { subscribe, unsubscribe, sendMessage, deactivateSocket } =
    useStompClient();

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
      deactivateSocket();
      setST(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
  }, [rooms, isConnected, subscribe, unsubscribe, client]);

  // update online status
  const { onlinePayload, offlinePayload } = useStatusPayload();

  useEffect(() => {
    if (rooms && isConnected && client) {
      rooms.forEach((room) => {
        sendMessage(`/app/rooms/${room.roomId}/status`, onlinePayload);
      });
    }

    return () => {
      rooms?.forEach((room) => {
        sendMessage(`/app/rooms/${room.roomId}/status`, offlinePayload);
      });
    };
  }, [rooms, isConnected, client]);
  useHeartbeat(10000);

  if (!interceptor) {
    return <div>{'Loading...'}</div>; // 인터셉터가 설정될 때까지 로딩 상태 표시
  }

  return (
    <Box display={'flex'}>
      <RoomList />
      <Routes>
        <Route path={'/main'} element={<FriendPage global={globalMenu} />} />
        <Route path={'/main/:id'} element={<DMPage global={globalMenu} />} />
        <Route
          path={'/channels/:roomId/:channelId'}
          element={<RoomPage global={globalMenu} />}
        />
        <Route path={'/explore'} element={<ExplorePage />} />
      </Routes>
    </Box>
  );
};

export default LoggedRouter;
