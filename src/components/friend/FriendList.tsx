import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';
import useHandleFriend from '@/lib/hooks/useHandleFriend';
import { IFriendRequest } from '@/types/friend';
import FriendBox from './FriendBox';

const Container = ({ children }: { children: ReactNode }) => (
  <Box width={'100%'} height={'100vh'} bg={'gray.600'}>
    {children}
  </Box>
);

const FriendList = () => {
  const { useGetFriendsListQuery } = useHandleFriend();
  const { data, isLoading, isError } = useGetFriendsListQuery();

  if (isLoading) {
    return (
      <Container>
        <Box fontWeight={'bold'} color={'white'} m={5}>
          {'친구 목록'}
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
        <Box fontWeight={'bold'} color={'white'} m={5}>
          {'친구 목록'}
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
      <Box fontWeight={'bold'} color={'white'} m={5}>
        {'친구 목록'}
      </Box>
      <Box
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        {(data as IFriendRequest[])?.length === 0 ? (
          <Box color={'white'}>{'등록된 친구가 없습니다'}</Box>
        ) : (
          (data as IFriendRequest[])?.map((friend: IFriendRequest) => (
            <FriendBox
              key={friend.friendId}
              id={friend.friendId}
              name={friend.friendName}
            />
          ))
        )}
      </Box>
    </Container>
  );
};

export default FriendList;
