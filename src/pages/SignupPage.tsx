import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box, Text } from '@chakra-ui/react';
import CustomInput from '@/components/login/AuthInput';
import Container from '@/components/shared/Container';
import { useAuthActions } from '@/lib/hooks/useAuthActions';
import useInput from '@/lib/hooks/useInput';

const SignupPage = () => {
  const [email, onChangeEmail] = useInput('');
  const [username, onChangeUsername] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [passwordCheck, onChangePasswordCheck] = useInput('');
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
        w={['full', 'sm']}
        p={[15, 10]}
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
          fontSize={'4xl'}
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
          onEnterPress={handleSubmit}
        />
        <CustomInput
          label={'닉네임'}
          type={'text'}
          value={username}
          onChange={onChangeUsername}
          isInvalid={isUsernameError}
          errorMessage={'Username is required'}
          onEnterPress={handleSubmit}
        />
        <CustomInput
          label={'비밀번호'}
          type={'password'}
          value={password}
          onChange={handlePasswordChange}
          isInvalid={isPasswordError}
          errorMessage={'Password is required'}
          onEnterPress={handleSubmit}
        />
        <CustomInput
          label={'비밀번호 확인'}
          type={'password'}
          value={passwordCheck}
          onChange={handlePasswordCheckChange}
          isInvalid={mismatchError}
          errorMessage={'Passwords do not match'}
          onEnterPress={handleSubmit}
        />
        <Button colorScheme={'purple'} w={'full'} mt={6} onClick={handleSubmit}>
          {'회원가입'}
        </Button>
        <Button colorScheme={'purple'} w={'full'} mt={5} variant={'outline'}>
          {'Naver Login'}
        </Button>
      </Box>
      <Box display={'flex'} alignItems={'center'} mt={5}>
        <Text color={'purple.600'} fontSize={'sm'}>
          {'have account?'}
        </Text>
        <Box
          borderColor={['', 'purple.400']}
          color={'purple.400'}
          fontSize={'sm'}
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
