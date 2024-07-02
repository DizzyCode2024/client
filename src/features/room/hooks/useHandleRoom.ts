import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCustomToast } from '@/hooks/useCustomToast';
import { QUERY_KEYS } from '@/api/queryKeys';
import { useNavigate } from 'react-router-dom';
import { createRoom, deleteRoom, leaveRoom } from '../api/roomApi';
import { IRoom, RoomId } from '../types';

const useHandleRoom = () => {
  const toast = useCustomToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  //   add room
  const { mutate: addRoomMutation } = useMutation<
    IRoom,
    Error,
    {
      roomName: string;
      open: boolean;
    }
  >({
    mutationFn: createRoom,
    onSuccess: (data) => {
      console.log('Room created:', data);
      toast({
        title: '방 생성 성공',
        description: '새로운 방이 생성되었습니다.',
        status: 'success',
      });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ROOMS });
      navigate(`/chat/channels/${data.roomId}`);
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
  const { mutate: deleteRoomMutation } = useMutation<void, Error, RoomId>({
    mutationFn: deleteRoom,
    onSuccess: () => {
      console.log('Room deleted');
      toast({
        title: '방 삭제 성공',
        description: '방이 삭제되었습니다.',
        status: 'success',
      });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ROOMS });
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

  // leave room
  const { mutate: leaveRoomMutation } = useMutation<void, Error, RoomId>({
    mutationFn: leaveRoom,
    onSuccess: () => {
      toast({
        title: '방 나가기 성공',
        status: 'success',
      });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ROOMS });
    },
    onError: (error) => {
      console.error('Error leaving room:', error);
      toast({
        title: '방 나가기 실패',
        description: '다시 시도해주세요.',
        status: 'error',
      });
    },
  });

  return { addRoomMutation, deleteRoomMutation, leaveRoomMutation };
};

export default useHandleRoom;
