import MainContainer from '@/components/shared/MainContainer';
import { useParams } from 'react-router-dom';
import DMSection from '@/components/dm';
import { useEffect, useRef } from 'react';
import useStompClient from '@/lib/hooks/useStompClient';
import useSocketStore from '@/lib/stores/useSocketStore';
// import useStatusPayload from '@/lib/hooks/status/useStatusPayload';
import { StompSubscription } from '@stomp/stompjs';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/lib/api';
import { getDmRooms } from '@/lib/api/afterLogin/dmApi';
import { IRoom } from '@/types';
import { Box } from '@chakra-ui/react';
import DMList from '../components/dm/DMList';
// import useHeartbeat from '@/lib/hooks/status/useHeartbeat';

const DMPage = () => {
  const param = useParams();
  const roomIdParam = param.id ? parseInt(param.id, 10) : 0;

  // get rooms
  const { data: rooms } = useQuery<IRoom[], Error>({
    queryKey: QUERY_KEYS.ROOMS,
    queryFn: getDmRooms,
  });

  // 웹소켓 연결
  const { client, isConnected } = useSocketStore();
  const { subscribe, unsubscribe } = useStompClient();

  // rooms 구독
  const subscriptionsRef = useRef<Map<number, StompSubscription>>(new Map());
  useEffect(() => {
    if (rooms && isConnected && client) {
      const currentRoomIds = new Set(rooms.map((room) => room.roomId));
      const existingSubscriptions = subscriptionsRef.current;

      // 구독되지 않은 새로운 방 구독
      rooms.forEach((room) => {
        console.log('room', room);
        if (!existingSubscriptions.has(room.roomId)) {
          const subscription = subscribe(
            `/topic/direct/room/${room.roomId}`,
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
  }, [isConnected, subscribe, unsubscribe, client, rooms]);

  // // update online status
  // const { onlinePayload, offlinePayload } = useStatusPayload();

  // useEffect(() => {
  //   if (rooms && isConnected && client) {
  //     rooms.forEach((room) => {
  //       sendMessage(`/app/rooms/${room.roomId}/status`, onlinePayload);
  //     });
  //   }

  //   return () => {
  //     rooms?.forEach((room) => {
  //       sendMessage(`/app/rooms/${room.roomId}/status`, offlinePayload);
  //     });
  //   };
  // }, [rooms, isConnected, client, sendMessage, onlinePayload, offlinePayload]);
  // useHeartbeat(10000);

  return (
    <MainContainer>
      <DMList />
      <Box
        display={'flex'}
        flexDirection={'column'}
        width={'100%'}
        whiteSpace={'nowrap'}
      >
        <DMSection roomId={roomIdParam} />
      </Box>
    </MainContainer>
  );
};

export default DMPage;
