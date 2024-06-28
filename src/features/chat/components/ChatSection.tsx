import { Box } from '@chakra-ui/react';
import ChatInput from './ChatInput';
import Header from './ChatHeader/Header';
import NoChatUI from './NoChat';

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
  return (
    <Container>
      <Header />
      <NoChatUI />
      <ChatInput />
    </Container>
  );
};

export default ChatSection;
