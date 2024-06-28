// import useStompClient from '@/features/room/hooks/useStompClient';
import { Input, Box } from '@chakra-ui/react';
import { useState } from 'react';

const ChatInput = ({ destination }: { destination: string }) => {
  const [message, setMessage] = useState<string>('');

  // const { sendMessage } = useStompClient();

  const handleSendMessage = (message: string) => {
    console.log('destination:', destination);
    console.log('message:', message);
    // sendMessage(destination, message);
  };

  return (
    <Box mt={4}>
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            handleSendMessage(message);
            setMessage('');
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
