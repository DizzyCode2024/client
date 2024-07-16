import React, { useState } from 'react';
import { Box, Text } from '@chakra-ui/react';
import useHandleFriend from '@/lib/hooks/useHandleFriend';
import { IFriendRequest } from '@/types/friend';
import FriendBox from './FriendBox';

// Container for layout styling
const Container = ({ children }: { children: React.ReactNode }) => (
  <Box width={'100%'} height={'100vh'} bg={'gray.600'}>
    {children}
  </Box>
);

// Manages which popover is open
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

// Displays a list of friends
const FriendList = () => {
  const { useGetFriendsListQuery } = useHandleFriend();
  const { data, isLoading, isError } = useGetFriendsListQuery();

  if (isLoading) {
    return (
      <Container>
        <Text fontWeight={'bold'} color={'white'} m={5}>
          {'Loading friends list...'}
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
          <Text color={'white'}>{'No friends registered'}</Text>
        ) : (
          <PopoverManager>
            {data.map((friend: IFriendRequest) => (
              <FriendBox
                key={friend.friendId}
                id={friend.friendId}
                name={friend.friendName}
                onClickDM={() =>
                  console.log('DM clicked for', friend.friendName)
                }
              />
            ))}
          </PopoverManager>
        )}
      </Box>
    </Container>
  );
};

export default FriendList;
