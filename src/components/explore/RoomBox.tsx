import { QUERY_KEYS, getCategories } from '@/lib/api';
import { spacing } from '@/lib/constants';
import useEnterRoom from '@/lib/hooks/explore/useEnterRoom';
import { useCustomToast } from '@/lib/hooks/useCustomToast';
import { IRoom } from '@/types';
import { Box, Heading, Icon, Text } from '@chakra-ui/react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { FaGlobeAmericas, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const RoomBox = ({ roomId, roomName, open }: IRoom) => {
  const toast = useCustomToast();
  const navigate = useNavigate();

  // check if the user is a member of the room
  const queryClient = useQueryClient();
  const joinedRooms = queryClient.getQueryData<IRoom[]>(QUERY_KEYS.ROOMS) || [];

  const isMember = joinedRooms.some((room) => room.roomId === roomId);

  // roomId의 첫 번째 채널로 이동
  const { data: roomInfo } = useQuery({
    queryKey: QUERY_KEYS.CATWCHANNELS(roomId),
    queryFn: () => getCategories(roomId),
    select: (data) => {
      if (data && data[0] && data[0].channels && data[0].channels[0]) {
        return {
          firstChannelId: data[0].channels[0].channelId,
        };
      }
      return null;
    },
    enabled: !!roomId,
  });

  const [firstChannelId, setFirstChannelId] = useState<number>(0);
  const { mutate: enterRoom } = useEnterRoom(
    roomId,
    roomInfo?.firstChannelId ?? 0,
  );

  useEffect(() => {
    if (roomInfo) {
      setFirstChannelId(roomInfo.firstChannelId);
    }
  }, [roomInfo]);

  const handleClick = () => {
    if (isMember) {
      toast({
        title: '이미 가입된 방입니다.',
        status: 'error',
      });

      if (firstChannelId === 0) return;
      navigate(`/chat/channels/${roomId}/${firstChannelId}`);
      return;
    }
    enterRoom(roomId);
  };

  return (
    <Box
      bg={'linear-gradient(145deg, #232a36, #2c3442)'}
      color={'white'}
      borderRadius={'15px'}
      minWidth={'200px'}
      p={spacing.padding}
      onClick={handleClick}
      _hover={{
        cursor: 'pointer',
        bg: 'linear-gradient(145deg, #171b24, #222936)',
        transform: 'scale(1.05)',
        transition: 'transform 0.5s ease-in-out, background 0.5s',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)',
      }}
    >
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Heading
          as={'h3'}
          size={'md'}
          fontWeight={'bold'}
          mb={2}
          color={'purple.100'}
        >
          {roomName}
        </Heading>
        <Text fontSize={'sm'}>{roomId}</Text>
      </Box>
      <Text fontSize={'sm'} display={'flex'} alignItems={'center'}>
        {open ? (
          <Icon as={FaGlobeAmericas} mr={2} />
        ) : (
          <Icon as={FaLock} mr={2} />
        )}{' '}
        {open ? 'Public' : 'Private'}
      </Text>
      <Text fontSize={'sm'} mt={2}>
        {isMember ? 'Member' : 'Not a member'}
      </Text>
    </Box>
  );
};

export default RoomBox;
