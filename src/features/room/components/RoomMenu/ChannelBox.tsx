import { ChatIcon } from '@chakra-ui/icons';
import { Box, Icon, Text } from '@chakra-ui/react';
import { MdKeyboardVoice } from 'react-icons/md';
import useRoomStore from '@/stores/useRoomStore';
import { CategoryId, ChannelId, ChannelType } from '../../types';

const ChannelBox = ({
  channelId,
  name,
  type,
  categoryId,
}: {
  channelId: ChannelId;
  name: string;
  type: ChannelType;
  categoryId: CategoryId;
}) => {
  const {
    isSelected,
    setCurrentChannelPath,
    currentChannelPath,
    setCurrentChannelInfo,
  } = useRoomStore((state) => ({
    isSelected: state.currentChannelPath.channelId === channelId,
    setCurrentChannelPath: state.setCurrentChannelPath,
    currentChannelPath: state.currentChannelPath,
    setCurrentChannelInfo: state.setCurrentChannelInfo,
  }));

  const handleClick = () => {
    setCurrentChannelPath({
      roomId: currentChannelPath.roomId,
      categoryId,
      channelId,
    });

    setCurrentChannelInfo({ name, type });
  };
  return (
    <Box
      onClick={handleClick}
      display={'flex'}
      alignItems={'center'}
      mx={2}
      py={2}
      color={'gray.300'}
      borderRadius={'3px'}
      transition={'all 0.2s ease-in'}
      _hover={{ bg: 'gray.600', color: 'white' }}
      cursor={'pointer'}
    >
      <Box
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        marginLeft={2}
        width={'3rem'}
        height={'3rem'}
        color={isSelected ? 'white' : 'gray.400'}
      >
        {type === 'CHAT' ? (
          <ChatIcon width={'2rem'} />
        ) : (
          <Icon as={MdKeyboardVoice} width={'2rem'} />
        )}
      </Box>
      <Text
        fontWeight={isSelected ? '900' : '500'}
        color={isSelected ? 'white' : 'gray.400'}
      >
        {name}
      </Text>
    </Box>
  );
};

export default ChannelBox;
