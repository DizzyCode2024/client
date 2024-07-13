import { QUERY_KEYS } from '@/api/queryKeys';
import { useCustomToast } from '@/hooks/useCustomToast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import useRoomStore from '@/stores/useRoomStore';
import { createRoom, deleteRoom, leaveRoom } from '../api/roomApi';
import { CreateRoomResponse, RoomId } from '../types';

const useHandleRoom = () => {
  const toast = useCustomToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { setCurrentChannelPath, setCurrentChannelInfo } = useRoomStore();

  //   add room
  const { mutate: addRoomMutation } = useMutation<
    CreateRoomResponse,
    Error,
    {
      roomName: string;
      open: boolean;
    }
  >({
    mutationFn: createRoom,
    onSuccess: async (data) => {
      toast({
        title: '방 생성 성공',
        description: '새로운 방이 생성되었습니다.',
        status: 'success',
      });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ROOMS });

      // 해당 방으로 이동
      setCurrentChannelPath({
        roomId: data.roomId,
        categoryId: data.categories[0].categoryId,
        channelId: data.categories[0].channels[0].channelId,
      });

      setCurrentChannelInfo({
        name: data.categories[0].channels[0].channelName,
        type: data.categories[0].channels[0].channelType,
      });
      navigate(
        `/chat/channels/${data.roomId}/${data.categories[0].channels[0].channelId}`,
      );
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
      // navigate(`/chat/channels/${}/${}`)
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
