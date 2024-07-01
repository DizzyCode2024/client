import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';
import WaitingBox from './WaitingBox';
import useHandleFriend from '../hooks/useHandleFriend';

const Container = ({ children }: { children: ReactNode }) => (
  <Box width={'100%'} height={'100vh'} bg={'gray.600'}>
    {children}
  </Box>
);

const WaitingList = () => {
  const { useGetPendingFriendRequestsQuery } = useHandleFriend();
  const { data, isLoading, isError } = useGetPendingFriendRequestsQuery();

  if (isLoading) {
    return (
      <Container>
        <Box fontWeight={'bold'} color={'white'} m={5}>
          {'친구 대기 목록'}
        </Box>
        <Box
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          {'Loading...'}
        </Box>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container>
        <Box fontWeight={'bold'} color={'white'} m={5}>
          {'친구 대기 목록'}
        </Box>
        <Box
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          {'Error loading friends'}
        </Box>
      </Container>
    );
  }

  return (
    <Container>
      <Box fontWeight={'bold'} color={'white'} m={5}>
        {'친구 대기 목록'}
      </Box>
      <Box
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        {data?.map(
          (friend: {
            friendId: number;
            friendName: string;
            currentStatus: string;
          }) => (
            <WaitingBox
              key={friend.friendId}
              id={friend.friendId}
              name={friend.friendName}
            />
          ),
        )}
      </Box>
    </Container>
  );
};

export default WaitingList;
