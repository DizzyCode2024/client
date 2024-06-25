import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box, Text, useToast } from '@chakra-ui/react';
import CustomInput from '@/components/AuthInput'; // CustomInput 컴포넌트 임포트
import Container from '@/components/Container'; // Container 컴포넌트 임포트
import { useAuthActions } from '../hooks/useAuthActions';
import useInput from '../hooks/useInput';

const LoginPage = () => {
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const { signin } = useAuthActions();
  const toast = useToast();

  const handleSubmit = async () => {
    setIsSubmitted(true);
    if (email && password) {
      try {
        await signin(email, password);
      } catch (error) {
        toast({
          title: '로그인 실패',
          description: '로그인 중 오류가 발생했습니다.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  const isEmailError = isSubmitted && email === '';
  const isPasswordError = isSubmitted && password === '';

  const navigate = useNavigate();
  const goToMain = () => {
    navigate('/');
  };

  const gotoSignup = () => navigate('/signup');

  return (
    <Container>
      <Box
        w={['full', 'md']}
        p={[15, 10]}
        mt={[20, '10vh']}
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
          fontSize={'6xl'}
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
          label={'비밀번호'}
          type={'password'}
          value={password}
          onChange={onChangePassword}
          isInvalid={isPasswordError}
          errorMessage={'Password is required'}
          onEnterPress={handleSubmit}
        />
        <Button
          colorScheme={'purple'}
          w={'full'}
          mt={7}
          onClick={handleSubmit}
          size={'lg'}
        >
          {'로그인'}
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
          {"Don't have an account?"}
        </Text>
        <Box
          borderColor={['', 'purple.400']}
          color={'purple.400'}
          fontSize={'xl'}
          ml={2}
          cursor={'pointer'}
          onClick={gotoSignup}
        >
          {'Sign up'}
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
