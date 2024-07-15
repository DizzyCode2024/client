import { Box } from '@chakra-ui/react';
import DMList from '../components/DMList';
import MainContainer from '../../../components/MainContainer';

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
