import React, { useEffect, useState } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { IFriend } from '@/types/friend';
import { useHandleFriend } from '@/lib/hooks/handlers';
import useFriendStore from '@/lib/stores/useFriendStore';
import FriendBox from './FriendBox';

const Container = ({ children }: { children: React.ReactNode }) => (
  <Box width={'100%'} height={'100vh'} bg={'gray.600'}>
    {children}
  </Box>
);

const PopoverManager = ({ children }: { children: React.ReactNode }) => {
  const [openPopoverId, setOpenPopoverId] = useState(null);

  const handleOpenPopover = (id: React.SetStateAction<null>) => {
    setOpenPopoverId(openPopoverId === id ? null : id);
  };

  const childrenWithProps = React.Children.map(children, (child) =>
    React.isValidElement(child)
      ? React.cloneElement(child, {
          openPopoverId,
          onOpenPopover: handleOpenPopover,
        })
      : child,
  );

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{childrenWithProps}</>;
};

const FriendList = () => {
  const { useGetFriendsListQuery } = useHandleFriend();
  const { data, isLoading, isError } = useGetFriendsListQuery();
  const { setFriends } = useFriendStore();

  useEffect(() => {
    if (data) {
      setFriends(data);
    }
  }, [data, setFriends]);

  if (isLoading) {
    return (
      <Container>
        <Text fontWeight={'bold'} color={'white'} m={5}>
          {'친구 목록 로딩중...'}
        </Text>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container>
        <Text fontWeight={'bold'} color={'white'} m={4} fontSize={'sm'}>
          {'Error loading friends'}
        </Text>
      </Container>
    );
  }

  return (
    <Container>
      <Text fontWeight={'bold'} color={'white'} m={4} fontSize={'sm'}>
        {'Friends List'}
      </Text>
      <Box
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        {data?.length === 0 ? (
          <Text color={'white'}>{'친구가 존재하지 않습니다.'}</Text>
        ) : (
          <PopoverManager>
            {data.map((friend: IFriend) => (
              <FriendBox
                key={friend.friendId}
                id={friend.friendId}
                name={friend.friendName}
              />
            ))}
          </PopoverManager>
        )}
      </Box>
    </Container>
  );
};

export default FriendList;
