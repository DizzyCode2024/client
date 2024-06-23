import React, { ReactNode } from "react";
import { useCustomToast } from "@/hooks/useCustomToast";
import { Text, Button, Center, Stack, Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

type ContainerProps = {
  children: ReactNode;
};
const Container: React.FC<ContainerProps> = ({ children }) => (
  <Box
    width="100%"
    height="100dvh"
    display="flex"
    justifyContent="center"
    alignItems="center"
    bg="gray.600"
    color="gray.100"
  >
    {children}
  </Box>
);

const WelcomePage = () => {
  const navigate = useNavigate();
  const gotoSignup = () => navigate("/signup");
  const gotoLogin = () => navigate("/login");

  // const toast = useCustomToast();
  // toast({ title: "hello", status: "success" });

  return (
    <Container>
      <Center w="100vw" h="100vh" flexDirection="column">
        <Text
          bgGradient="linear(to-l, #00cdac, #8ddad5)"
          bgClip="text"
          fontSize="8xl"
          fontWeight="bold"
        >
          Dizzy Code
        </Text>
        <Stack
          direction="row"
          mt={5}
          spacing={10}
          align="center"
          justifyContent="center"
        >
          <Button
            colorScheme="teal"
            size="lg"
            variant="solid"
            onClick={gotoSignup}
          >
            Sign up
          </Button>
          <Button
            colorScheme="teal"
            size="lg"
            variant="outline"
            onClick={gotoLogin}
          >
            Login
          </Button>
        </Stack>
      </Center>
    </Container>
  );
};

export default WelcomePage;
