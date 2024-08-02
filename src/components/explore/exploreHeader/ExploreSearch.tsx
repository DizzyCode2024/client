import { spacing } from '@/lib/constants';
import { Box, Input, Text } from '@chakra-ui/react';

const ExploreSearch = () => {
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
        />
      </Box>
    </Box>
  );
};

export default ExploreSearch;
