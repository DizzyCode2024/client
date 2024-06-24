import React, { ReactNode } from "react";
import { Text, Button, Center, Stack, Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Container from "@/components/Container";

type CustomButtonProps = {
  children: ReactNode;
};

const CustomButton: React.FC<CustomButtonProps> = ({ children, ...props }) => {
  return (
    <Button
      colorScheme="purple"
      size="xl"
      width="10rem"
      height="3rem"
      transition="0.3s ease-in"
      {...props}
    >
      {children}
    </Button>
  );
};

const WelcomePage = () => {
  const navigate = useNavigate();
  const gotoSignup = () => navigate("/signup");
  const gotoLogin = () => navigate("/login");

  return (
    <Container>
      <Center w="100vw" h="100vh" flexDirection="column">
        <Text
          bgGradient="linear(to-l, purple.400, purple.200)"
          bgClip="text"
          fontSize="8xl"
          fontWeight="bold"
        >
          Dizzy Code
        </Text>
        <Box
          m="10rem"
          as={motion.div}
          height="10rem"
          width="10rem"
          bg="purple.500"
          drag="x"
          dragConstraints={{ left: -100, right: 100 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition="0.5s linear"
        />
        <Stack
          direction="row"
          mt={5}
          spacing={10}
          align="center"
          justifyContent="center"
        >
          <CustomButton onClick={gotoSignup} variant="solid">
            Sign up
          </CustomButton>
          <CustomButton
            onClick={gotoLogin}
            variant="outline"
            _hover={{ bg: "white" }}
          >
            Login
          </CustomButton>
        </Stack>
      </Center>
    </Container>
  );
};

export default WelcomePage;
