import { QUERY_KEYS, getRecommendations } from '@/lib/api';
import { spacing } from '@/lib/constants';
import { Box, Input, Text } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

const ExploreSearch = () => {
  const [value, setValue] = useState<string>('');

  const { data } = useQuery({
    queryKey: QUERY_KEYS.ROOM_RECOMMENDATION(value),
    queryFn: () => getRecommendations(value, 5),
  });

  return (
    <Box>
      <Text
        mt={spacing.offset}
        textAlign={'center'}
        color={'white'}
        fontSize={'2xl'}
      >
        {'DizzyCode에서 커뮤니티 찾기'}
      </Text>
      <Box mt={spacing.gutter} mb={spacing.offset} mx={'10rem'}>
        <Input
          variant={'filled'}
          placeholder={'Explore communities and join them!'}
          height={'3rem'}
          bg={'gray.700'}
          fontSize={'md'}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </Box>
      <Text>{data}</Text>
    </Box>
  );
};

export default ExploreSearch;
