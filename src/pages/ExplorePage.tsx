import ExploreMenu from '@/components/explore/ExploreMenu';
import ExploreHome from '@/components/explore/Home';
import Recommend from '@/components/explore/Recommend';
import { Box } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const ExplorePage = ({
  setMenu,
}: {
  setMenu: React.Dispatch<React.SetStateAction<React.ReactNode>>;
}) => {
  useEffect(() => {
    setMenu(<ExploreMenu />);
  }, []);

  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword');

  return (
    <Box flex={1} bg={'gray.600'}>
      {keyword ? <Recommend keyword={keyword} /> : <ExploreHome />}
    </Box>
  );
};

export default ExplorePage;
