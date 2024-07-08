import { Flex, Box, Text } from '@chakra-ui/react';
import { Publisher, StreamManager } from 'openvidu-browser';
import UserVideoComponent from './VideoComponent';

const VideoContainer = ({
  publisher,
  subscribers,
  handleMainVideoStream,
}: {
  publisher: Publisher;
  subscribers: StreamManager[];
  handleMainVideoStream: any;
}) => {
  const allParticipants = [publisher, ...subscribers];

  return (
    <Flex
      w={'100%'}
      h={'100%'}
      p={4}
      flexWrap={'wrap'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      {allParticipants.map((participant, index) =>
        participant ? (
          <Box
            key={participant.stream.connection.connectionId}
            flexBasis={{ base: '100%', sm: '50%', md: '33.33%', lg: '25%' }}
            maxW={{ base: '100%', sm: '50%', md: '33.33%', lg: '25%' }}
            minW={'300px'}
            minH={'300px'}
            p={2}
            onClick={() => handleMainVideoStream(participant as StreamManager)}
            cursor={'pointer'}
            position={'relative'}
            display={'flex'}
            flexDirection={'column'}
            alignItems={'center'}
            justifyContent={'center'}
            bg={'gray.800'}
            borderRadius={'md'}
            overflow={'hidden'}
          >
            {index === 0 && (
              <Text position={'absolute'} top={2} left={2} color={'white'}>
                {'Publisher'}
              </Text>
            )}
            {index !== 0 && (
              <Text position={'absolute'} top={2} left={2} color={'white'}>
                {'Subscriber'}
              </Text>
            )}
            <UserVideoComponent streamManager={participant} />
          </Box>
        ) : null,
      )}
    </Flex>
  );
};

export default VideoContainer;
