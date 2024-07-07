import { QUERY_KEYS } from '@/api/queryKeys';
import useStompClient from '@/features/chat/hooks/useStompClient';
import useRoomStore from '@/stores/useRoomStore';
import useSocketStore from '@/stores/useSocketStore';
import { StompSubscription } from '@stomp/stompjs';
import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { useDestination } from '../../hooks/useDestination';
import { IReceiveChatPayload } from '../../types';
import Container from '../Container';
import Header from './ChatHeader/Header';
import ChatInput from './ChatInput';
import ChatContainer from './ChatSection/ChatContainer';

const ChatSection = () => {
  const {
    currentChannelPath: { roomId, categoryId, channelId },
  } = useRoomStore();

  // 채널 연결 subscribe
  const { isConnected, client } = useSocketStore();
  const { subscribe, unsubscribe } = useStompClient();
  const subscriptionRef = useRef<StompSubscription | null>(null);
  const { ChannelTopic: topic } = useDestination();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (isConnected && roomId && categoryId && channelId && client) {
      // console.log('ChatSection useEffect', isConnected);

      const subscription = subscribe(topic, (message) => {
        const chatMessage: IReceiveChatPayload = JSON.parse(message.body);
        console.log(`Received message in channel ${channelId}:`, chatMessage);
        // TODO: 받은 메시지 처리
        queryClient.setQueryData<InfiniteData<IReceiveChatPayload[]>>(
          QUERY_KEYS.CHATS({ roomId, categoryId, channelId }),
          (oldData) => {
            if (!oldData) return oldData;

            // Ensure the message is not already in the cache
            const newPages = [...oldData.pages];
            if (
              !newPages[0].some(
                (msg) => msg.messageId === chatMessage.messageId,
              )
            ) {
              newPages[0] = [chatMessage, ...newPages[0]];
            }

            return { ...oldData, pages: newPages };
          },
        );
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
    queryClient,
    topic,
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
