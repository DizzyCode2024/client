import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';
import SearchFriend from './SearchFriend';

const Container = ({ children }: { children: ReactNode }) => (
  <Box width={'100%'} height={'100vh'} bg={'gray.600'}>
    {children}
  </Box>
);
const FriendRequest = () => {
  return (
    <Container>
      <Box fontWeight={'bold'} color={'white'} m={5} borderRadius={'md'}>
        {'친구 추가하기'}
      </Box>
      <Box
        color={'gray.400'}
        marginLeft={5}
        borderRadius={'md'}
        fontSize={'xl'}
      >
        {'Dizzy Code 아이디를 이용해서 친구요청을 할 수 있어요.'}
      </Box>
      <Box>
        <SearchFriend />
      </Box>
    </Container>
  );
};

export default FriendRequest;
