import { Box } from '@chakra-ui/react';
import ChatInput from './ChatInput';
import Header from './ChatHeader/Header';
import NoChatUI from './NoChat';
// import useRoomStore from '@/stores/useRoomStore';
// import useStompClient from '@/features/room/hooks/useStompClient';
// import { useEffect, useRef } from 'react';
// import { StompSubscription } from '@stomp/stompjs';
// import { ChatMessage } from '@/features/room/types';

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
  // 서버에서 채팅방 구독 topic이 아직 생성이 안됨

  // const {
  //   currentChannelPath: { roomId, categoryId, channelId },
  // } = useRoomStore();

  // // 채팅방 연결 subscribe
  // const { isConnected, subscribe, unsubscribe, sendMessage } = useStompClient();
  // const subscriptionRef = useRef<StompSubscription | null>(null);

  // useEffect(() => {
  //   console.log('ChatSection useEffect');
  //   if (isConnected && roomId && categoryId && channelId) {
  //     const topic = `/topic/rooms/${roomId}/categories/${categoryId}/channels/${channelId}`;
  //     subscriptionRef.current = subscribe(topic, (message) => {
  //       const chatMessage: ChatMessage = JSON.parse(message.body);
  //       console.log(`Received message in channel ${channelId}:`, chatMessage);
  //       // TODO: 받은 메시지 처리
  //     });
  //   }

  //   return () => {
  //     if (subscriptionRef.current) {
  //       unsubscribe(subscriptionRef.current);
  //       subscriptionRef.current = null;
  //     }
  //   };
  // }, [isConnected, roomId, categoryId, channelId, subscribe, unsubscribe]);

  // const handleSendMessage = (message: string) => {
  //   const destination = `/rooms/${roomId}/categories/${categoryId}/channels/${channelId}`;
  //   sendMessage(destination, message);
  // };

  return (
    <Container>
      <Header />
      <NoChatUI />
      <ChatInput />
    </Container>
  );
};

export default ChatSection;
