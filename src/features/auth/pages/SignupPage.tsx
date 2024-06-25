import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box, Text } from '@chakra-ui/react';
import CustomInput from '@/components/AuthInput';
import Container from '@/components/Container';
import { useAuthActions } from '../hooks/useAuthActions';
import useInput from '../hooks/useInput';

const SignupPage = () => {
  const [email, onChangeEmail] = useInput('');
  const [username, onChangeUsername] = useInput('');
  const [password, onChangePassword, setPassword] = useInput('');
  const [passwordCheck, onChangePasswordCheck, setPasswordCheck] = useInput('');
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

  const isEmailError = isSubmitted && email === '';
  const isUsernameError = isSubmitted && username === '';
  const isPasswordError = isSubmitted && password === '';

  const navigate = useNavigate();
  const goToMain = () => {
    navigate('/');
  };
  const gotoLogin = () => navigate('/login');

  const handlePasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChangePassword(e);
      setMismatchError(passwordCheck !== e.target.value);
    },
    [passwordCheck, onChangePassword],
  );

  const handlePasswordCheckChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChangePasswordCheck(e);
      setMismatchError(password !== e.target.value);
    },
    [password, onChangePasswordCheck],
  );

  return (
    <Container>
      <Box
        w={['full', 'lg']}
        p={[15, 12]}
        mt={[20, '8vh']}
        mx={'auto'}
        bg={'gray.900'}
        border={['none', '1px']}
        borderColor={['', 'purple.400']}
        borderRadius={10}
        color={'gray.100'}
      >
        <Text
          bgGradient={'linear(to-l, purple.400, purple.300)'}
          bgClip={'text'}
          fontSize={'7xl'}
          fontWeight={'bold'}
          onClick={goToMain}
          _hover={{ cursor: 'pointer' }}
        >
          {'Dizzy Code'}
        </Text>
        <CustomInput
          label={'이메일'}
          type={'email'}
          value={email}
          onChange={onChangeEmail}
          isInvalid={isEmailError}
          errorMessage={'Email is required'}
        />
        <CustomInput
          label={'닉네임'}
          type={'text'}
          value={username}
          onChange={onChangeUsername}
          isInvalid={isUsernameError}
          errorMessage={'Username is required'}
        />
        <CustomInput
          label={'비밀번호'}
          type={'password'}
          value={password}
          onChange={handlePasswordChange}
          isInvalid={isPasswordError}
          errorMessage={'Password is required'}
        />
        <CustomInput
          label={'비밀번호 확인'}
          type={'password'}
          value={passwordCheck}
          onChange={handlePasswordCheckChange}
          isInvalid={mismatchError}
          errorMessage={'Passwords do not match'}
        />
        <Button
          colorScheme={'purple'}
          w={'full'}
          mt={10}
          onClick={handleSubmit}
          size={'lg'}
        >
          {'회원가입'}
        </Button>
        <Button
          colorScheme={'purple'}
          w={'full'}
          mt={5}
          variant={'outline'}
          size={'lg'}
        >
          {'Google Login'}
        </Button>
      </Box>
      <Box display={'flex'} alignItems={'center'} mt={5}>
        <Text color={'purple.600'} fontSize={'xl'}>
          {'have account?'}
        </Text>
        <Box
          borderColor={['', 'purple.400']}
          color={'purple.400'}
          fontSize={'xl'}
          ml={2}
          cursor={'pointer'}
          onClick={gotoLogin}
        >
          {'Login'}
        </Box>
      </Box>
    </Container>
  );
};

export default SignupPage;
