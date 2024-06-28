import CustomTooltip from '@/components/Tooltip';
import useRoomStore from '@/stores/useRoomStore';
import { handleRightClick } from '@/utils/handleRightClick';
import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuList,
  useDisclosure,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { RoomId } from '../../types';
import Indicator from './Indicator';
import RoomMenuItems from './RoomMenuItems';

const RoomButton = ({
  label,
  id,
  thumbnail,
}: {
  label: string;
  id: RoomId;
  thumbnail: JSX.Element;
}) => {
  const navigate = useNavigate();
  const isSelected = useRoomStore(
    (state) => state.currentChannelPath.roomId === id,
  );

  const handleClick = () => {
    navigate(`/chat/channels/${id}`);
  };
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      w={'100%'}
      display={'flex'}
      justifyContent={'center'}
      position={'relative'}
      onContextMenu={(e) => handleRightClick(e, onOpen)}
    >
      {isSelected && <Indicator />}

      <CustomTooltip label={label} placement={'right'}>
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
          {thumbnail}
        </Button>
      </CustomTooltip>

      <Menu isOpen={isOpen} onClose={onClose}>
        <MenuButton as={Box} style={{}} />
        <MenuList mt={'-5rem'} ml={'1rem'}>
          <RoomMenuItems />
        </MenuList>
      </Menu>
    </Box>
  );
};

export default RoomButton;
