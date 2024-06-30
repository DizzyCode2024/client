import { Box } from '@chakra-ui/react';
import ChatBox from './ChatBox';

const data = [
  {
    messageId: '1',
    senderUsername: 'test2',
    content: 'asdfsdfd',
    timestamp: '2024-06-28T11:33:35.242781',
  },
  {
    messageId: '2',
    senderUsername: 'test2',
    content: 'asdfsdfd',
    timestamp: '2024-06-29T11:33:35.242782',
  },
  {
    messageId: '3',
    senderUsername: 'test2',
    content: 'asdfsdfd',
    timestamp: '2024-06-30T11:33:35.242783',
  },
];
const ChatContainer = () => {
  return (
    <Box mt={'auto'} color={'white'}>
      {data.map((chat) => (
        <ChatBox
          key={chat.messageId}
          content={chat.content}
          senderUsername={chat.senderUsername}
          timestamp={chat.timestamp}
        />
      ))}
    </Box>
  );
};

export default ChatContainer;
