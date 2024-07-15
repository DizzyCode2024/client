import React, { ReactNode } from 'react';
import { Text, Button, Center, Stack, Box, keyframes } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Container from '@/components/shared/Container';

const animationKeyframes = keyframes`
0% { transform: scale(1) rotate(0); border-radius: 20%; }
  12.5% { transform: scale(1.5) rotate(45deg); border-radius: 40%; }
  25% { transform: scale(2) rotate(90deg); border-radius: 60%; }
  37.5% { transform: scale(1.5) rotate(135deg); border-radius: 80%; }
  50% { transform: scale(1) rotate(180deg); border-radius: 50%; }
  62.5% { transform: scale(1.5) rotate(225deg); border-radius: 30%; }
  75% { transform: scale(2) rotate(270deg); border-radius: 20%; }
  87.5% { transform: scale(1.5) rotate(315deg); border-radius: 10%; }
  100% { transform: scale(1) rotate(360deg); border-radius: 20%; }
`;

const animation = `${animationKeyframes} 5s ease infinite`;

type CustomButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  variant?: string;
  _hover?: object;
};

const CustomButton: React.FC<CustomButtonProps> = ({ children, ...props }) => {
  return (
    <Button
      as={motion.button}
      colorScheme={'purple'}
      size={'xl'}
      width={'10rem'}
      height={'3rem'}
      transition={'0.3s ease-in'}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      {...props}
    >
      {children}
    </Button>
  );
};

const WelcomePage = () => {
  const navigate = useNavigate();
  const gotoSignup = () => navigate('/signup');
  const gotoLogin = () => navigate('/login');

  return (
    <Container>
      <Center w={'100vw'} h={'100vh'} flexDirection={'column'}>
        <Text
          bgGradient={'linear(to-l, purple.400, purple.200)'}
          bgClip={'text'}
          fontSize={'8xl'}
          fontWeight={'bold'}
          mb={5}
        >
          {'Dizzy Code'}
        </Text>
        <Box
          m={'5rem'}
          as={motion.div}
          animation={animation}
          padding={'2'}
          bgGradient={'linear(to-l, purple.800, purple.400)'}
          width={'8rem'}
          height={'8rem'}
          display={'flex'}
        />
        <Stack
          direction={'row'}
          mt={'7rem'}
          spacing={10}
          align={'center'}
          justifyContent={'center'}
        >
          <CustomButton onClick={gotoSignup} variant={'solid'}>
            {'Sign up'}
          </CustomButton>
          <CustomButton
            onClick={gotoLogin}
            variant={'outline'}
            _hover={{ bg: 'white' }}
          >
            {'Login'}
          </CustomButton>
        </Stack>
      </Center>
    </Container>
  );
};

export default WelcomePage;
