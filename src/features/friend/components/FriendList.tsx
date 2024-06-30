import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';
import FriendBox from './FriendBox';

const friends = [
  { id: 1, name: 'Soda' },
  { id: 2, name: 'Cola' },
  { id: 3, name: 'Pepsi' },
  { id: 4, name: 'Fanta' },
  { id: 5, name: 'Sprite' },
];

const Container = ({ children }: { children: ReactNode }) => (
  <Box width={'100%'} height={'100vh'} bg={'gray.600'}>
    {children}
  </Box>
);

const FriendList = () => {
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
        {friends.map((friend) => (
          <FriendBox key={friend.id} id={friend.id} name={friend.name} />
        ))}
      </Box>
    </Container>
  );
};

export default FriendList;
