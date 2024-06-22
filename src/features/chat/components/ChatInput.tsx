import { Input, Box } from "@chakra-ui/react";

const ChatInput = () => {
  return (
    <Box mt={4}>
      <Input
        variant="filled"
        placeholder="#일반채팅에 메시지 보내기"
        height="5rem"
        bg="gray.700"
        fontSize="2xl"
      />
    </Box>
  );
};

export default ChatInput;
