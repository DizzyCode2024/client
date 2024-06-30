import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';

const Container = ({ children }: { children: ReactNode }) => (
  <Box width={'100%'} height={'100vh'} bg={'gray.600'}>
    {children}
  </Box>
);
const WaitingList = () => {
  return (
    <Container>
      <Box>{'친구 대기 목록'}</Box>
    </Container>
  );
};

export default WaitingList;
