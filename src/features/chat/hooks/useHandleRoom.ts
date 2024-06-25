import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCustomToast } from '@/hooks/useCustomToast';
import { createRoom, deleteRoom } from '../api/roomApi';
import { IRoom } from '../types';

const useHandleRoom = () => {
  const toast = useCustomToast();
  const queryClient = useQueryClient();

  //   add room
  const addRoomMutation = useMutation<IRoom, Error, string>({
    mutationFn: createRoom,
    onSuccess: (data) => {
      console.log('Room created:', data);
      toast({
        title: '방 생성 성공',
        description: '새로운 방이 생성되었습니다.',
        status: 'success',
      });
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
    },
    onError: (error) => {
      console.error('Error creating room:', error);
      toast({
        title: '방 생성 실패',
        description: '다시 시도해주세요.',
        status: 'error',
      });
    },
  });

  //   delete room
  const deleteRoomMutation = useMutation<void, Error, number>({
    mutationFn: deleteRoom,
    onSuccess: () => {
      console.log('Room deleted');
      toast({
        title: '방 삭제 성공',
        description: '방이 삭제되었습니다.',
        status: 'success',
      });
    },
    onError: (error) => {
      console.error('Error deleting room:', error);
      toast({
        title: '방 삭제 실패',
        description: '다시 시도해주세요.',
        status: 'error',
      });
    },
  });

  return { addRoomMutation, deleteRoomMutation };
};

export default useHandleRoom;
