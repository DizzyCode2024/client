import { useEffect, useRef } from 'react';
import { StompSubscription } from '@stomp/stompjs';
import { IRoom } from '@/types';
import useSocketStore from '@/lib/stores/useSocketStore';
import useStompClient from '@/lib/hooks/useStompClient';

const useRoomSubscriptions = (rooms: IRoom[] | undefined) => {
  const { client, isConnected } = useSocketStore();
  const { subscribe, unsubscribe } = useStompClient();
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
};

export default useRoomSubscriptions;
