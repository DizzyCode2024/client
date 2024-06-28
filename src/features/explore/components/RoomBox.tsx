import { spacing } from '@/constants/spacing';
import { IRoom } from '@/features/room/types';
import { Box } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCustomToast } from '@/hooks/useCustomToast';
import { QUERY_KEYS } from '@/api/queryKeys';
import { useNavigate } from 'react-router-dom';
import { enterRoom } from '../api/exploreApi';

const RoomBox = ({ roomId, roomName, open }: IRoom) => {
  const toast = useCustomToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: enterRoom,
    onSuccess: () => {
      toast({
        title: '방 입장 성공',
        description: '방에 입장했습니다.',
        status: 'success',
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.ROOMS,
      });
      navigate(`/chat/channels/${roomId}`);
    },
    onError: (error) => {
      console.error('Error entering room:', error);
      toast({
        title: '방 입장 실패',
        description: '다시 시도해주세요.',
        status: 'error',
      });
    },
  });

  const handleClick = () => {
    console.log(roomId);
    // enter room
    mutation.mutate(roomId);
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
      <p>{open ? 'Public' : 'Private'}</p>
    </Box>
  );
};

export default RoomBox;
