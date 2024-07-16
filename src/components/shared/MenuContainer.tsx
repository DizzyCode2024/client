import { Box } from '@chakra-ui/react';

const Container = ({ children }: { children: React.ReactNode }) => (
  <Box
    minWidth={'14.5rem'}
    height={'100vh'}
    bg={'gray.700'}
    display={'flex'}
    flexDirection={'column'}
  >
    {children}
  </Box>
);

const MenuContainer = ({ children }: { children: React.ReactNode }) => {
  return <Container>{children}</Container>;
};

export default MenuContainer;
