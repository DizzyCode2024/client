import { ChatIcon, BellIcon, CalendarIcon } from "@chakra-ui/icons";
import { Box, Tooltip } from "@chakra-ui/react";

const Container = ({ children }) => (
  <Box
    width="100%"
    height="4rem"
    display="flex"
    justifyContent="space-between"
    alignItems="center"
    bg="gray.600"
    color="gray.100"
    boxShadow="base"
    p="6"
  >
    {children}
  </Box>
);

const ChatTopMenu = () => {
  return (
    <Container>
      <Box display="flex" alignItems="center">
        <Box
          color="white"
          textAlign="left"
          paddingLeft={2}
          paddingRight={7}
          fontSize="2xl"
          fontWeight="bold"
        >
          <ChatIcon marginRight={2} color="gray.200" />
          일반채팅 1
        </Box>
      </Box>
      <Box>
        <Tooltip label="날짜" bg="gray.900" fontSize="2xl">
          <Box as="button" mr={3}>
            <CalendarIcon color="gray.300" _hover={{ color: "white" }} />
          </Box>
        </Tooltip>
        <Tooltip label="알림설정" bg="gray.900" fontSize="2xl">
          <Box as="button">
            <BellIcon color="gray.300" _hover={{ color: "white" }} />
          </Box>
        </Tooltip>
      </Box>
    </Container>
  );
};

export default ChatTopMenu;
