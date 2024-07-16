import React, { ReactNode } from 'react';
import { Box } from '@chakra-ui/react';

type ContainerProps = {
  children: ReactNode;
};

const Container: React.FC<ContainerProps> = ({ children }) => (
  <Box
    width={'100%'}
    height={'100dvh'}
    display={'flex'}
    flexDirection={'column'}
    justifyContent={'center'}
    alignItems={'center'}
    bg={'gray.800'}
    color={'gray.100'}
  >
    {children}
  </Box>
);

export default Container;
