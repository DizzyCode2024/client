import useRoomStore from "@/stores/useRoomStore";
import { Box, Divider, Stack, Text } from "@chakra-ui/react";
import AddServerButton from "./AddServerButton";
import DMButton from "./DMButton";
import ServerButton from "./ServerButton";

const Container = ({ children }: { children: React.ReactNode }) => (
  <Box minWidth="7.5rem" height="100vh" bg="gray.800">
    {children}
  </Box>
);

const ServerList = () => {
  const roomList = useRoomStore((state) => state.rooms);

  return (
    <Container>
      <Stack display="flex" justifyContent="center" alignItems="center" mt={2}>
        {/* DM */}
        <DMButton />

        <Divider borderColor="gray.500" w="3rem" />

        {/* Server */}
        {roomList?.map((room) => (
          <ServerButton
            key={room.roomId}
            id={room.roomId}
            thumbnail={<Text fontSize="2xl">{room.roomName}</Text>}
            label={room.roomName}
          />
        ))}

        {/* Add Server */}
        <AddServerButton />
      </Stack>
    </Container>
  );
};

export default ServerList;
