import CustomTooltip from '@/components/shared/Tooltip';
import { Box, Button, Icon } from '@chakra-ui/react';
import { FaCompass } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import useRoomStore from '@/lib/stores/useRoomStore';
import Indicator from './Indicator';

const ExploreButton = () => {
  const navigate = useNavigate();
  const isSelected = useRoomStore(
    (state) => state.currentChannelPath.roomId === -1,
  );
  return (
    <Box
      w={'100%'}
      display={'flex'}
      justifyContent={'center'}
      position={'relative'}
    >
      {isSelected && <Indicator />}
      <CustomTooltip label={'방 탐색하기'} placement={'right'}>
        <Button
          onClick={() => {
            navigate('/chat/explore');
          }}
          m={'0.5rem auto'}
          h={'5rem'}
          w={'5rem'}
          borderRadius={'30%'}
          transition={'all 0.3s ease-in-out'}
          bg={isSelected ? 'green' : 'gray.700'}
          color={isSelected ? 'white' : 'green'}
          fontSize={'1rem'}
          _hover={{
            bg: 'green',
            color: 'white',
          }}
        >
          <Icon as={FaCompass} boxSize={8} />
        </Button>
      </CustomTooltip>
    </Box>
  );
};

export default ExploreButton;
