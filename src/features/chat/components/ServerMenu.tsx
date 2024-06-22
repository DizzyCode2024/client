import { Box, Text, Tooltip } from "@chakra-ui/react";
import { ChatIcon, ChevronDownIcon, SmallAddIcon } from "@chakra-ui/icons";
import UserBox from "./UserBox";

const Container = ({ children }) => (
  <Box
    minWidth="23rem"
    height="100vh"
    bg="gray.700"
    display="flex"
    flexDirection="column"
  >
    {children}
  </Box>
);
const ServerMenu = () => {
  return (
    <Container>
      <Box
        as="button"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        height="4rem"
        width="23rem"
        color="gray.200"
        textAlign="left"
        paddingLeft={2}
        fontSize="2xl"
        transition="all 0.2s ease-in"
        boxShadow="base"
        _hover={{ bg: "gray.600", color: "white" }}
      >
        <Box ml={3} fontWeight="bold">
          서버 1
        </Box>
        <ChevronDownIcon mr={5} />
      </Box>

      <Box
        color="gray.400"
        fontSize="xl"
        fontWeight="bold"
        margin="10px"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box as="button" _hover={{ color: "gray.100" }}>
          <ChevronDownIcon mr={1} />
          채팅 채널
        </Box>
        <Tooltip
          label="채널 만들기"
          fontSize="2xl"
          placement="top"
          backgroundColor="gray.900"
        >
          <SmallAddIcon
            _hover={{ bg: "gray.600", color: "white", cursor: "pointer" }}
          />
        </Tooltip>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        width="21rem"
        height="4rem"
        marginLeft={2}
        color="gray.300"
        borderRadius="3px"
        transition="all 0.2s ease-in"
        _hover={{ bg: "gray.600", color: "white" }}
        cursor="pointer"
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          marginLeft={2}
          width="3rem"
          height="3rem"
        >
          <ChatIcon width="2rem" />
        </Box>
        <Text>일반채팅 1</Text>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        width="21rem"
        height="4rem"
        marginLeft={2}
        color="gray.300"
        borderRadius="3px"
        transition="all 0.2s ease-in"
        _hover={{ bg: "gray.600", color: "white" }}
        cursor="pointer"
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          marginLeft={2}
          width="3rem"
          height="3rem"
        >
          <ChatIcon width="2rem" />
        </Box>
        <Text>일반채팅 2</Text>
      </Box>
      <UserBox />
    </Container>
  );
};

export default ServerMenu;
