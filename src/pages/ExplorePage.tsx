import ExploreBody from '@/components/explore/exploreBody/ExploreBody';
import ExploreSearch from '@/components/explore/exploreHeader/ExploreSearch';
import { Box } from '@chakra-ui/react';

const ExplorePage = () => {
  return (
    <Box flex={1} bg={'gray.600'}>
      <ExploreSearch />
      <ExploreBody />
    </Box>
  );
};

export default ExplorePage;
