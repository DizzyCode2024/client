import { useState } from "react";
import {
  Button,
  Box,
  Text,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  const isEmailError = isSubmitted && email === "";
  const isPasswordError = isSubmitted && password === "";

  return (
    <Box
      w={["full", "md"]}
      p={[15, 10]}
      mt={[20, "10vh"]}
      mx="auto"
      border={["none", "1px"]}
      borderColor={["", "gray.300"]}
      borderRadius={10}
    >
      <Text
        bgGradient="linear(to-l, #00cdac, #8ddad5)"
        bgClip="text"
        fontSize="6xl"
        fontWeight="bold"
      >
        Dizzy Code
      </Text>
      <Text mt={5} fontSize={12}>
        이메일과 비밀번호를 입력해주세요.
      </Text>
      <FormControl mt={8} isInvalid={isEmailError}>
        <FormLabel>이메일</FormLabel>
        <Input
          rounded="none"
          variant="filled"
          type="email"
          value={email}
          onChange={handleEmailChange}
        />
        {isEmailError && <FormErrorMessage>Email is required</FormErrorMessage>}
      </FormControl>
      <FormControl mt={3} isInvalid={isPasswordError}>
        <FormLabel>비밀번호</FormLabel>
        <Input
          rounded="none"
          variant="filled"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        {isPasswordError && (
          <FormErrorMessage>Password is required</FormErrorMessage>
        )}
      </FormControl>
      <Button colorScheme="teal" w="full" mt={7} onClick={handleSubmit}>
        로그인
      </Button>
      <Button colorScheme="blue" w="full" mt={3} variant="outline">
        Google Login
      </Button>
    </Box>
  );
};

export default LoginPage;
