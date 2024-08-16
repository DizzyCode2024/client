import ExploreMenu from '@/components/explore/ExploreMenu';
import ExploreBody from '@/components/explore/exploreBody/ExploreBody';
import ExploreSearch from '@/components/explore/exploreHeader/ExploreSearch';
import { Box } from '@chakra-ui/react';
import { useEffect } from 'react';

const ExplorePage = ({
  setMenu,
}: {
  setMenu: React.Dispatch<React.SetStateAction<React.ReactNode>>;
}) => {
  useEffect(() => {
    setMenu(<ExploreMenu />);
  }, []);

  return (
    <Box flex={1} bg={'gray.600'}>
      <ExploreSearch />
      <ExploreBody />
    </Box>
  );
};

export default ExplorePage;
