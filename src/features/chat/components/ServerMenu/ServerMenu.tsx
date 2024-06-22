import { Box } from "@chakra-ui/react";
import UserBox from "../UserBox";
import CategoryBox from "./CategoryBox";
import ChannelBox from "./ChannelBox";
import ServerMenuButton from "./ServerMenuButton";

const Container = ({ children }: { children: React.ReactNode }) => (
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
      <ServerMenuButton name="서버 1" />
      <CategoryBox name="채팅 채널">
        <ChannelBox name="채널 1" />
        <ChannelBox name="채널 2" />
      </CategoryBox>
      <UserBox />
    </Container>
  );
};

export default ServerMenu;
