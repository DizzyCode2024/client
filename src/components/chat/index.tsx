import { QUERY_KEYS } from '@/lib/api/afterLogin/queryKeys';
import useStompClient from '@/lib/hooks/useStompClient';
import useRoomStore from '@/lib/stores/useRoomStore';
import useSocketStore from '@/lib/stores/useSocketStore';
import { Flex } from '@chakra-ui/react';
import { StompSubscription } from '@stomp/stompjs';
import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { useDestination } from '../../lib/hooks/useDestination';
import { IChat } from '../../types';
import MemberList from '../memberList';
import ChatContainer from './ChatBody/ChatContainer';
import Header from './ChatHeader/Header';
import ChatInput from './ChatInput/ChatInput';
import Container from './DragFileContainer';

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
      const subscription = subscribe(topic, (message) => {
        const chatMessage: IChat = JSON.parse(message.body);
        console.log(`Received message in channel ${channelId}:`, chatMessage);
        // TODO: 받은 메시지 처리
        queryClient.setQueryData<InfiniteData<IChat[]>>(
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

  const [isMembersOpen, setIsMembersOpen] = useState<boolean>(false);
  return (
    <Container>
      <Header
        isMembersOpen={isMembersOpen}
        setIsMembersOpen={setIsMembersOpen}
      />
      <Flex flex={1}>
        <Flex flex={1} direction={'column'}>
          <ChatContainer />
          <ChatInput />
        </Flex>
        {isMembersOpen && <MemberList />}
      </Flex>
    </Container>
  );
};

export default ChatSection;
