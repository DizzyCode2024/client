import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';

const Container = ({ children }: { children: ReactNode }) => (
  <Box display={'flex'} width={'100%'} height={'100vh'} bg={'gray.600'}>
    {children}
  </Box>
);
const MainContainer = ({ children }: { children: React.ReactNode }) => {
  return <Container>{children}</Container>;
};

export default MainContainer;
