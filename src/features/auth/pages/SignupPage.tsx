import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Box,
  Text,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { useAuthActions } from "../hooks/useAuthActions";
import useInput from "../hooks/useInput";

const SignupPage = () => {
  const [email, onChangeEmail] = useInput("");
  const [username, onChangeUsername] = useInput("");
  const [password, onChangePassword, setPassword] = useInput(""); // 변경된 부분
  const [passwordCheck, onChangePasswordCheck, setPasswordCheck] = useInput(""); // 변경된 부분
  const [mismatchError, setMismatchError] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const { signup } = useAuthActions();

  const handleSubmit = async () => {
    setIsSubmitted(true);
    if (email && username && password && !mismatchError) {
      try {
        await signup(email, password, username);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const isEmailError = isSubmitted && email === "";
  const isUsernameError = isSubmitted && username === "";
  const isPasswordError = isSubmitted && password === "";

  const navigate = useNavigate();
  const goToMain = () => {
    navigate("/");
  };

  const handlePasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChangePassword(e);
      setMismatchError(passwordCheck !== e.target.value);
    },
    [passwordCheck, onChangePassword]
  );

  const handlePasswordCheckChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChangePasswordCheck(e);
      setMismatchError(password !== e.target.value);
    },
    [password, onChangePasswordCheck]
  );

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
        onClick={goToMain}
        _hover={{ cursor: "pointer" }}
      >
        Dizzy Code
      </Text>
      <FormControl mt={3} isInvalid={isEmailError}>
        <FormLabel>이메일</FormLabel>
        <Input
          rounded="none"
          variant="filled"
          type="email"
          value={email}
          onChange={onChangeEmail}
        />
        {isEmailError && <FormErrorMessage>Email is required</FormErrorMessage>}
      </FormControl>
      <FormControl mt={3} isInvalid={isUsernameError}>
        <FormLabel>닉네임</FormLabel>
        <Input
          rounded="none"
          variant="filled"
          type="text"
          value={username}
          onChange={onChangeUsername}
        />
        {isUsernameError && (
          <FormErrorMessage>Username is required</FormErrorMessage>
        )}
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
      <FormControl mt={3} isInvalid={mismatchError}>
        <FormLabel>비밀번호 확인</FormLabel>
        <Input
          rounded="none"
          variant="filled"
          type="password"
          value={passwordCheck}
          onChange={handlePasswordCheckChange}
        />
        {mismatchError && (
          <FormErrorMessage>Passwords do not match</FormErrorMessage>
        )}
      </FormControl>
      <Button colorScheme="teal" w="full" mt={7} onClick={handleSubmit}>
        회원가입
      </Button>
      <Button colorScheme="blue" w="full" mt={3} variant="outline">
        Google Login
      </Button>
    </Box>
  );
};

export default SignupPage;
