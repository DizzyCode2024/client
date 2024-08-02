import { QUERY_KEYS } from '@/lib/api';
import { spacing } from '@/lib/constants';
import useRoomStore from '@/lib/stores/useRoomStore';
import useVoiceStateStore from '@/lib/stores/voice/useVoiceStateStore';
import { IRoom } from '@/types';
import { Box, Flex } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { GiNetworkBars } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';
import useConnectedVoiceStore from '@/lib/stores/voice/useConnectedVoiceStore';
import Controller from './Controller';

const VoiceBox = () => {
  const [roomName, setRoomName] = useState<string>('');
  const navigate = useNavigate();
  const {
    currentChannelInfo: { name: channelName },
    setCurrentChannelPath,
    setCurrentChannelInfo,
  } = useRoomStore();

  const {
    connectedVoicePath: { roomId, categoryId, channelId },
    connectedVoiceInfo: { name, type },
  } = useConnectedVoiceStore();

  const queryClient = useQueryClient();
  const rooms: IRoom[] =
    queryClient.getQueryData<IRoom[]>(QUERY_KEYS.ROOMS) || [];

  useEffect(() => {
    rooms?.forEach((room) => {
      if (room.roomId === roomId) {
        setRoomName(room.roomName);
      }
    });
  }, [rooms, roomId]);

  const { session } = useVoiceStateStore();

  const handleNavigate = () => {
    setCurrentChannelPath({
      roomId,
      categoryId,
      channelId,
    });
    setCurrentChannelInfo({ name, type });
    navigate(`/chat/channels/${roomId}/${channelId}`);
    console.log('navigate to', roomId, channelId);
  };

  if (!session) {
    return null;
  }
  return (
    <Box
      width={'full'}
      bg={'gray.800'}
      borderBottom={'1px'}
      borderColor={'gray.700'}
      p={spacing.small}
      pt={spacing.small}
      cursor={'pointer'}
      onClick={handleNavigate}
    >
      <Flex
        color={'green'}
        fontSize={'sm'}
        fontWeight={'bold'}
        gap={spacing.small}
        alignItems={'flex-end'}
        pb={spacing.small}
      >
        <GiNetworkBars />
        {'Voice Connected'}
      </Flex>
      <Box fontSize={'small'} color={'gray.500'} pb={spacing.small}>
        {channelName}
        {' / '}
        {roomName}
      </Box>
      <Controller />
    </Box>
  );
};

export default VoiceBox;
