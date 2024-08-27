import { QUERY_KEYS, getRecommendations } from '@/lib/api';
import { spacing } from '@/lib/constants';
import { IRoom } from '@/types';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import { Box, Flex } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import RoomBox from '../RoomBox';

const Recommend = ({ keyword }: { keyword: string }) => {
  const { data } = useQuery<IRoom[]>({
    queryKey: QUERY_KEYS.ROOM_RECOMMENDATION(keyword),
    queryFn: () => getRecommendations(keyword, 5),
    enabled: keyword !== '',
  });

  return (
    <Box h={'100vh'} overflowY={'scroll'} overflowX={'hidden'}>
      <ChevronLeftIcon
        w={'2rem'}
        h={'2rem'}
        color={'white'}
        ml={spacing.padding}
        mt={spacing.padding}
        onClick={() => window.history.back()}
      />
      <Flex p={spacing.padding} direction={'column'} gap={spacing.padding}>
        {data?.map((room) => (
          <RoomBox
            key={room.roomId}
            roomId={room.roomId}
            roomName={room.roomName}
            open
          />
        ))}
      </Flex>
    </Box>
  );
};

export default Recommend;
