import { Box } from "@chakra-ui/react";
import UserBox from "../../../user/components/UserBox/UserBox";
import CategoryBox from "./CategoryBox";
import ChannelBox from "./ChannelBox";
import ServerMenuButton from "./ServerMenuButton";
import useServerStore from "@/stores/useServerStore";
import { useEffect, useState } from "react";

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
  const servers = useServerStore((state) => state.servers);
  const currentServer = useServerStore((state) => state.currentServerId);

  const [currentServerName, setCurrentServerName] = useState<string>("");

  useEffect(() => {
    servers?.map((server) => {
      server.id === currentServer ? setCurrentServerName(server.name) : null;
    });
  }, [currentServer]);

  return (
    <Container>
      <ServerMenuButton name={currentServerName} />
      <CategoryBox name="채팅 채널">
        <ChannelBox name="채널 1" />
        <ChannelBox name="채널 2" />
      </CategoryBox>
      <UserBox />
    </Container>
  );
};

export default ServerMenu;
