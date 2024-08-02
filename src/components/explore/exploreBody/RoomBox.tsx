import { Box, Heading, Text, Icon } from '@chakra-ui/react';
import { spacing } from '@/lib/constants';
import { FaLock, FaGlobeAmericas } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useCustomToast } from '@/lib/hooks/useCustomToast';
import useEnterRoom from '@/lib/hooks/explore/useEnterRoom';
import { IRoomBox } from '@/types';

const RoomBox = ({ roomId, roomName, open, isMember }: IRoomBox) => {
  const { mutate: enterRoom } = useEnterRoom(roomId);
  const toast = useCustomToast();
  const navigate = useNavigate();

  const handleClick = () => {
    if (isMember) {
      toast({
        title: '이미 가입된 방입니다.',
        status: 'error',
      });
      navigate(`/chat/channels/${roomId}`);
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
