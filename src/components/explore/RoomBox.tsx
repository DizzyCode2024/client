import { spacing } from '@/lib/constants';
import { useCustomToast } from '@/lib/hooks/useCustomToast';
import { Box } from '@chakra-ui/react';
import useEnterRoom from '@/lib/hooks/explore/useEnterRoom';
import { IRoomBox } from '@/types';

const RoomBox = ({ roomId, roomName, open, isMember }: IRoomBox) => {
  const { mutate: enterRoom } = useEnterRoom(roomId);
  const toast = useCustomToast();
  const handleClick = () => {
    if (isMember) {
      toast({
        title: '이미 가입된 방입니다.',
        status: 'error',
      });
      return;
    }
    enterRoom(roomId);
  };

  return (
    <Box
      bg={'gray.900'}
      color={'white'}
      borderRadius={'5%'}
      p={spacing.padding}
      onClick={handleClick}
    >
      <h1>{roomName}</h1>
      <p>{roomId}</p>
      <p>{open ? 'Public' : 'Private'}</p>
      <p>{isMember ? 'Member' : 'Not a member'}</p>
    </Box>
  );
};

export default RoomBox;
