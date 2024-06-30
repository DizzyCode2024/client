import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';
import WaitingBox from './WaitingBox';

// Mock data
const friends = [
  { id: 1, name: 'Cola' },
  { id: 2, name: 'Kombucha' },
  { id: 3, name: 'Ediya' },
];

const Container = ({ children }: { children: ReactNode }) => (
  <Box width={'100%'} height={'100vh'} bg={'gray.600'}>
    {children}
  </Box>
);

const WaitingList = () => {
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
        {friends.map((friend) => (
          <WaitingBox key={friend.id} id={friend.id} name={friend.name} />
        ))}
      </Box>
    </Container>
  );
};

export default WaitingList;
