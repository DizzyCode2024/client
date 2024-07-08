import useStompClient from '@/features/chat/hooks/useStompClient';
import { useAuthStore } from '@/stores/useAuthStore';
import { Box, Input, HStack } from '@chakra-ui/react';
import { useState } from 'react';
import { useDestination } from '../../../hooks/useDestination';
import { ISendChatPayload } from '../../../types';
import InputPlusBtn from './InputPlusBtn';

const ChatInput = () => {
  const [content, setContent] = useState<string>('');
  const senderId = useAuthStore((state) => state.user?.id);

  const { sendMessage } = useStompClient();
  const { destination } = useDestination();

  const handleSendMessage = (payload: ISendChatPayload) => {
    console.log('destination:', destination);
    console.log('send payload:', payload);
    sendMessage(destination, payload);
  };

  return (
    <Box mt={4}>
      <HStack gap={'0'} backgroundColor={'gray.700'}>
        <InputPlusBtn />
        <Input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && senderId && content) {
              handleSendMessage({ senderId, content });
              setContent('');
            }
          }}
          variant={'filled'}
          placeholder={'#일반채팅에 메시지 보내기'}
          height={'5rem'}
          bg={'gray.700'}
          fontSize={'2xl'}
          borderRadius={'0'}
          color={'gray.100'}
          _hover={{
            bg: 'gray.600',
          }}
          flexGrow={1}
        />
      </HStack>
    </Box>
  );
};

export default ChatInput;
