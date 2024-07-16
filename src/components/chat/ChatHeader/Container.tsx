import { Box } from '@chakra-ui/react';

const Container = ({ children }: { children: React.ReactNode }) => (
  <Box
    width={'100%'}
    height={'3rem'}
    display={'flex'}
    justifyContent={'space-between'}
    alignItems={'center'}
    bg={'gray.600'}
    color={'gray.100'}
    boxShadow={'base'}
    p={'6'}
  >
    {children}
  </Box>
);

export default Container;
