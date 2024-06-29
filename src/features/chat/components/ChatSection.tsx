import { Box } from '@chakra-ui/react';
import useRoomStore from '@/stores/useRoomStore';
import useStompClient from '@/features/room/hooks/useStompClient';
import { useEffect, useRef } from 'react';
import { StompSubscription } from '@stomp/stompjs';
import useSocketStore from '@/stores/useSocketStore';
import ChatInput from './ChatInput';
import Header from './ChatHeader/Header';
import NoChatUI from './NoChat';
import { IChatMessage } from '../types';

const Container = ({ children }: { children: React.ReactNode }) => (
  <Box
    width={'100%'}
    height={'100vh'}
    bg={'gray.600'}
    display={'flex'}
    flexDirection={'column'}
  >
    {children}
  </Box>
);

const ChatSection = () => {
  const {
    currentChannelPath: { roomId, categoryId, channelId },
  } = useRoomStore();

  // 채팅방 연결 subscribe
  const { isConnected } = useSocketStore();
  const { subscribe, unsubscribe } = useStompClient();
  const subscriptionRef = useRef<StompSubscription | null>(null);

  useEffect(() => {
    if (isConnected && roomId && categoryId && channelId) {
      console.log('ChatSection useEffect', isConnected);
      const topic = `/topic/rooms/${roomId}/categories/${categoryId}/channels/${channelId}`;
      subscriptionRef.current = subscribe(topic, (message) => {
        const chatMessage: IChatMessage = JSON.parse(message.body);
        console.log(`Received message in channel ${channelId}:`, chatMessage);
        // TODO: 받은 메시지 처리
      });
    }

    return () => {
      if (subscriptionRef.current) {
        unsubscribe(subscriptionRef.current);
        subscriptionRef.current = null;
      }
    };
  }, [isConnected, roomId, categoryId, channelId, subscribe, unsubscribe]);

  const destination = `app/rooms/${roomId}/categories/${categoryId}/channels/${channelId}`;

  return (
    <Container>
      <Header />
      <NoChatUI />
      <ChatInput destination={destination} />
    </Container>
  );
};

export default ChatSection;
