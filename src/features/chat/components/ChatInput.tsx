import useStompClient from '@/features/room/hooks/useStompClient';
import { Input, Box } from '@chakra-ui/react';
import { useState } from 'react';
import { useAuthStore } from '@/stores/useAuthStore';
import { ISendChatPayload } from '../types';

const ChatInput = ({ destination }: { destination: string }) => {
  const [content, setContent] = useState<string>('');
  const senderId = useAuthStore((state) => state.user?.id);

  const { sendMessage } = useStompClient();

  const handleSendMessage = (payload: ISendChatPayload) => {
    console.log('destination:', destination);
    console.log('send payload:', payload);
    sendMessage(destination, payload);
  };

  return (
    <Box mt={4}>
      <Input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            if (senderId && content) {
              handleSendMessage({ senderId, content });
            }
            setContent('');
          }
        }}
        variant={'filled'}
        placeholder={'#일반채팅에 메시지 보내기'}
        height={'5rem'}
        bg={'gray.700'}
        fontSize={'2xl'}
      />
    </Box>
  );
};

export default ChatInput;
