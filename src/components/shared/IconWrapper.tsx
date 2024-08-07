import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';

const IconWrapper = ({ children }: { children: ReactNode }) => (
  <Box
    display={'flex'}
    alignItems={'center'}
    justifyContent={'center'}
    borderRadius={'50%'}
    bg={'gray.900'}
    width={'2rem'}
    height={'2rem'}
    mx={1}
    as={'button'}
  >
    {children}
  </Box>
);

export default IconWrapper;
