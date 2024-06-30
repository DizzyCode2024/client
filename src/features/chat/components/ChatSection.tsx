import useStompClient from '@/features/room/hooks/useStompClient';
import useRoomStore from '@/stores/useRoomStore';
import useSocketStore from '@/stores/useSocketStore';
import { Box } from '@chakra-ui/react';
import { StompSubscription } from '@stomp/stompjs';
import { useEffect, useRef } from 'react';
import { useDestination } from '../hooks/useDestination';
import { ISendChatPayload } from '../types';
import Header from './ChatHeader/Header';
import ChatInput from './ChatInput';
import ChatContainer from './ChatSection/ChatContainer';

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

  // 채널 연결 subscribe
  const { isConnected, client } = useSocketStore();
  const { subscribe, unsubscribe } = useStompClient();
  const subscriptionRef = useRef<StompSubscription | null>(null);
  const { ChannelTopic: topic } = useDestination();

  useEffect(() => {
    if (isConnected && roomId && categoryId && channelId && client) {
      console.log('ChatSection useEffect', isConnected);

      const subscription = subscribe(topic, (message) => {
        const chatMessage: ISendChatPayload = JSON.parse(message.body);
        console.log(`Received message in channel ${channelId}:`, chatMessage);
        // TODO: 받은 메시지 처리
      });
      if (subscription) {
        subscriptionRef.current = subscription;
      } else {
        console.error(`Failed to subscribe to ${topic}`);
      }
    }

    return () => {
      if (subscriptionRef.current) {
        unsubscribe(subscriptionRef.current);
        subscriptionRef.current = null;
      }
    };
  }, [
    isConnected,
    roomId,
    categoryId,
    channelId,
    subscribe,
    unsubscribe,
    client,
  ]);

  return (
    <Container>
      <Header />
      <ChatContainer />
      <ChatInput />
    </Container>
  );
};

export default ChatSection;
