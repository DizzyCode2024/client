import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { useHandleFriend } from '@/lib/hooks/handlers';
import WaitingBox from './WaitingBox';

const Container = ({ children }: { children: ReactNode }) => (
  <Box width={'100%'} height={'100vh'} bg={'gray.600'}>
    {children}
  </Box>
);

const WaitingList = () => {
  const {
    useGetPendingFriendRequestsQuery,
    acceptFriendRequestMutation,
    rejectFriendRequestMutation,
  } = useHandleFriend();
  const { data, isLoading, isError } = useGetPendingFriendRequestsQuery();

  if (isLoading) {
    return (
      <Container>
        <Box fontWeight={'bold'} color={'white'} m={4} fontSize={'sm'}>
          {'친구 대기 목록'}
        </Box>
        <Box
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
          color={'white'}
        >
          {'Loading...'}
        </Box>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container>
        <Box fontWeight={'bold'} color={'white'} m={4} fontSize={'sm'}>
          {'친구 대기 목록'}
        </Box>
        <Box
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
          color={'white'}
        >
          {'Error loading friends'}
        </Box>
      </Container>
    );
  }

  return (
    <Container>
      <Box fontWeight={'bold'} color={'white'} m={4} fontSize={'sm'}>
        {'친구 대기 목록'}
      </Box>
      <Box
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        {data?.length === 0 ? (
          <Box color={'white'}>{'친구 요청이 없습니다'}</Box>
        ) : (
          data?.map(
            (friend: {
              friendId: number;
              friendName: string;
              currentStatus: string;
            }) => (
              <WaitingBox
                key={friend.friendId}
                id={friend.friendId}
                name={friend.friendName}
                onClickAccept={() =>
                  acceptFriendRequestMutation({ member2Id: friend.friendId })
                }
                onClickReject={() =>
                  rejectFriendRequestMutation({ member2Id: friend.friendId })
                }
              />
            ),
          )
        )}
      </Box>
    </Container>
  );
};

export default WaitingList;
