import { Box } from '@chakra-ui/react';
import MainContainer from '@/components/shared/MainContainer';
import DMList from '../components/dm/DMList';

const DMPage = () => {
  return (
    <MainContainer>
      <DMList />
      <Box
        display={'flex'}
        flexDirection={'column'}
        width={'100%'}
        whiteSpace={'nowrap'}
      >
        {'dmpage'}
      </Box>
    </MainContainer>
  );
};

export default DMPage;
