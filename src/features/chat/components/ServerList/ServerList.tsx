import useServerStore from "@/stores/useServerStore";
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
  const serverList = useServerStore((state) => state.servers);

  return (
    <Container>
      <Stack display="flex" justifyContent="center" alignItems="center" mt={2}>
        {/* DM */}
        <DMButton />

        <Divider borderColor="gray.500" w="3rem" />

        {/* Server */}
        {serverList?.map((server) => (
          <ServerButton
            key={server.id}
            id={server.id}
            thumbnail={<Text fontSize="2xl">{server.name}</Text>}
            label={server.name}
          />
        ))}

        {/* Add Server */}
        <AddServerButton />
      </Stack>
    </Container>
  );
};

export default ServerList;
