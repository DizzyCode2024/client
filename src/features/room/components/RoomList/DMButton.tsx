import { Box, Button, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import CustomTooltip from '@/components/Tooltip';
import useRoomStore from '@/stores/useRoomStore';
import Indicator from './Indicator';

const DMButton = () => {
  const isSelected = useRoomStore(
    (state) => state.currentChannelPath.roomId === 0,
  ); // DM room의 id는 0
  const navigate = useNavigate();
  const { setCurrentChannelPath } = useRoomStore();

  const handleClick = () => {
    navigate('/chat/main');
    setCurrentChannelPath({
      roomId: 0,
      categoryId: 0,
      channelId: 0,
    });
  };
  return (
    <Box
      w={'100%'}
      display={'flex'}
      justifyContent={'center'}
      position={'relative'}
    >
      {isSelected && <Indicator />}
      <CustomTooltip label={'다이렉트 메세지'} placement={'right'}>
        <Button
          onClick={handleClick}
          m={'0.5rem auto'}
          h={'5rem'}
          w={'5rem'}
          borderRadius={isSelected ? '30%' : '50%'}
          transition={'all 0.3s ease-in-out'}
          bg={isSelected ? 'purple.600' : 'gray.700'}
          color={'white'}
          fontSize={'1rem'}
          _hover={{
            bg: 'purple.600',
            borderRadius: '30%',
            color: 'white',
          }}
        >
          <Text fontSize={'2xl'}>{'DM'}</Text>
        </Button>
      </CustomTooltip>
    </Box>
  );
};

export default DMButton;
