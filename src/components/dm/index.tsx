import { useDestination } from '@/lib/hooks/useDestination';
import useStompClient from '@/lib/hooks/useStompClient';
import useSocketStore from '@/lib/stores/useSocketStore';
import { Flex } from '@chakra-ui/react';
import { StompSubscription } from '@stomp/stompjs';
// import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import useDmStore from '@/lib/stores/useDmStore';
import Container from '../chat/DragFileContainer';
// import MemberList from '../memberList';
import DMContainer from './DMBody/DmContainer';
// import Header from './DmHeader/Header';
import DmInput from './DmInput/DmInput';
import Header from './DmHeader/Header';

const DMSection = () => {
  const [isMembersOpen, setIsMembersOpen] = useState<boolean>(false);
  const { isConnected, client } = useSocketStore();
  const { subscribe, unsubscribe } = useStompClient();
  const subscriptionRef = useRef<StompSubscription | null>(null);
  const { DmRoomTopic: topic } = useDestination();
  const { currentDmId } = useDmStore();
  // const queryClient = useQueryClient();

  useEffect(() => {
    if (isConnected && client && currentDmId) {
      const subscription = subscribe(topic, (message) => {
        const dmMessage = JSON.parse(message.body);
        console.log(`Received message in Friend: `, dmMessage);
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
  }, [isConnected, subscribe, unsubscribe, client, topic, currentDmId]);

  return (
    <Container>
      <Header
        isMembersOpen={isMembersOpen}
        setIsMembersOpen={setIsMembersOpen}
      />
      <Flex flex={1}>
        <Flex flex={1} direction={'column'}>
          <DMContainer />
          <DmInput />
        </Flex>
      </Flex>
      {/* <Flex>{isMembersOpen && <MemberList />}</Flex> */}
    </Container>
  );
};

export default DMSection;
