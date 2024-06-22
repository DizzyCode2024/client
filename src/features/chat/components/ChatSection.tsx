import { Box } from "@chakra-ui/react";
import ChatTopMenu from "./ChatTopMenu";
import { ChatIcon } from "@chakra-ui/icons";
import ChatInput from "./ChatInput";

const Container = ({ children }) => (
  <Box
    width="100%"
    height="100vh"
    bg="gray.600"
    display="flex"
    flexDirection="column"
  >
    {children}
  </Box>
);

const NoChat = () => {
  return (
    <Box color="white" mt="auto" ml={5}>
      <Box
        ml={5}
        mb={5}
        bg="gray.500"
        width="8rem"
        height="8rem"
        borderRadius="50%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <ChatIcon width="3rem" height="3rem" />
      </Box>

      <Box fontSize="5xl" display="flex" alignItems="center" fontWeight="bold">
        <ChatIcon mr={2} />
        일반 채팅에 오신 걸 환영 합니다!
      </Box>
      <Box fontSize="2xl" display="flex" alignItems="center">
        <ChatIcon mr={2} />
        일반 채팅 채널의 시작이에요.
      </Box>
    </Box>
  );
};
const ChatSection = () => {
  return (
    <Container>
      <ChatTopMenu />
      <NoChat />
      <ChatInput />
    </Container>
  );
};

export default ChatSection;
