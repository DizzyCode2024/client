import { useDestination } from '@/lib/hooks/useDestination';
import useStompClient from '@/lib/hooks/useStompClient';
import useSocketStore from '@/lib/stores/useSocketStore';
import { Flex } from '@chakra-ui/react';
import { StompSubscription } from '@stomp/stompjs';
import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import useDmStore from '@/lib/stores/useDmStore';
import { IChat } from '@/types';
import { QUERY_KEYS } from '@/lib/api';
import Container from '../chat/DragFileContainer';
// import MemberList from '../memberList';
import DmInput from './DmInput/DmInput';
import Header from './DmHeader/Header';
import DmContainer from './DmBody/DmContainer';

const DMSection = () => {
  const [isMembersOpen, setIsMembersOpen] = useState<boolean>(false);
  const { isConnected, client } = useSocketStore();
  const { subscribe, unsubscribe } = useStompClient();
  const subscriptionRef = useRef<StompSubscription | null>(null);
  const { DmRoomTopic: topic } = useDestination();
  const { currentDmId } = useDmStore();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (isConnected && client && currentDmId) {
      const subscription = subscribe(topic, (message) => {
        const dmMessage = JSON.parse(message.body);
        console.log(`Received message in Friend: `, dmMessage);
        // 받은 메시지 처리
        queryClient.setQueryData<InfiniteData<IChat[]>>(
          QUERY_KEYS.DM_CHATS({
            roomId: 0,
            categoryId: 0,
            channelId: currentDmId,
          }),
          (oldData) => {
            if (!oldData) return oldData;

            // Ensure the message is not already in the cache
            const newPages = [...oldData.pages];
            if (
              !newPages[0].some((msg) => msg.messageId === dmMessage.messageId)
            ) {
              newPages[0] = [dmMessage, ...newPages[0]];
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
    subscribe,
    unsubscribe,
    client,
    topic,
    currentDmId,
    queryClient,
  ]);

  return (
    <Container>
      <Header
        isMembersOpen={isMembersOpen}
        setIsMembersOpen={setIsMembersOpen}
      />
      <Flex flex={1} overflow={'scroll'}>
        <Flex flex={1} direction={'column'}>
          <DmContainer />
          <DmInput />
        </Flex>
      </Flex>
      {/* <Flex>{isMembersOpen && <MemberList />}</Flex> */}
    </Container>
  );
};

export default DMSection;
