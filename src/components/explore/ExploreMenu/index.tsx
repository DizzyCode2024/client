import { spacing } from '@/lib/constants';
import { Text } from '@chakra-ui/react';

const ExploreMenu = () => {
  return (
    <div>
      <Text
        color={'gray.200'}
        fontSize={'x-large'}
        h={'4rem'}
        display={'flex'}
        alignItems={'center'}
        pl={spacing.padding}
        fontWeight={'bold'}
      >
        {'Discover'}
      </Text>
    </div>
  );
};

export default ExploreMenu;
