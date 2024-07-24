import CustomTooltip from '@/components/shared/Tooltip';
import { QUERY_KEYS, getCategories } from '@/lib/api';
import useRoomStore from '@/lib/stores/useRoomStore';
import { handleRightClick } from '@/lib/utils/handleRightClick';
import { RoomId } from '@/types';
import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuList,
  useDisclosure,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import Indicator from './Indicator';
import RoomMenuItems from './RoomMenuItems';

interface RoomButtonProps {
  label: string;
  roomId: RoomId;
  thumbnail: JSX.Element;
}

const RoomButton = ({ label, roomId, thumbnail }: RoomButtonProps) => {
  const navigate = useNavigate();
  const isRoomSelected = useRoomStore(
    (state) => state.currentChannelPath.roomId === roomId,
  );
  const { setCurrentChannelPath, setCurrentChannelInfo } = useRoomStore();

  // 방 클릭했을 때, 최근 방문한 채널 기록이 없다면 ? 첫 번째 채널로 이동 : 해당 채널로 이동
  const { data } = useQuery({
    queryKey: QUERY_KEYS.CATWCHANNELS(roomId),
    queryFn: () => getCategories(roomId),
    select: (data) => {
      if (data && data[0] && data[0].channels && data[0].channels[0]) {
        return {
          firstCategoryId: data[0].categoryId,
          firstChannelId: data[0].channels[0].channelId,

          firstChannelName: data[0].channels[0].channelName,
          firstChannelType: data[0].channels[0].channelType,
        };
      }
      return null;
    },
    enabled: roomId !== 0,
  });

  const handleClick = () => {
    if (!data) return;
    setCurrentChannelPath({
      roomId,
      categoryId: data.firstCategoryId,
      channelId: data.firstChannelId,
    });

    setCurrentChannelInfo({
      name: data.firstChannelName,
      type: data.firstChannelType,
    });

    navigate(`/chat/channels/${roomId}/${data.firstChannelId}`);
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
      {isRoomSelected && <Indicator />}

      <CustomTooltip label={label} placement={'right'}>
        <Button
          onClick={handleClick}
          m={'0.2rem auto'}
          h={'3rem'}
          w={'3rem'}
          borderRadius={isRoomSelected ? '30%' : '50%'}
          transition={'all 0.3s ease-in-out'}
          bg={isRoomSelected ? 'purple.600' : 'gray.700'}
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
