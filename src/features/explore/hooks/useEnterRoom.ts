import { useCustomToast } from '@/hooks/useCustomToast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { QUERY_KEYS } from '@/api/queryKeys';
import { RoomId } from '@/features/room/types';
import { enterRoom } from '@/features/room/api/roomApi';

const useEnterRoom = (roomId: RoomId) => {
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

  return { mutate };
};

export default useEnterRoom;
