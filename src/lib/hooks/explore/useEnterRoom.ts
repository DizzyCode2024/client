import { QUERY_KEYS, enterRoom } from '@/lib/api';
import { useCustomToast } from '@/lib/hooks/useCustomToast';
import { ChannelId, RoomId } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const useEnterRoom = (roomId: RoomId, firstChannelId: ChannelId) => {
  const toast = useCustomToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: (roomId: RoomId) => enterRoom(roomId),
    onSuccess: () => {
      toast({
        title: '방 입장 성공',
        description: '방에 입장했습니다.',
        status: 'success',
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.ROOMS,
      });
      if (firstChannelId !== 0) {
        navigate(`/chat/channels/${roomId}/${firstChannelId}`);
      }
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

  return { mutate };
};

export default useEnterRoom;
