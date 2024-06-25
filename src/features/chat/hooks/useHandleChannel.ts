import { useCustomToast } from '@/hooks/useCustomToast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '../api/queryKeys';
import { createChannel } from '../api/channelApi';
import { RoomId } from '../types';

const useHandleChannel = (roomId: RoomId) => {
  const toast = useCustomToast();
  const queryClient = useQueryClient();

  // add channel

  const addChannelMutation = useMutation({
    mutationFn: createChannel,
    onSuccess: (data) => {
      console.log('Channel created:', data);
      toast({
        title: '채널 생성 성공',
        description: '새로운 채널이 생성되었습니다.',
        status: 'success',
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.CATWCHANNELS(roomId),
      });
    },
    onError: (error) => {
      console.error('Error creating channel:', error);
      toast({
        title: '채널 생성 실패',
        description: '다시 시도해주세요.',
        status: 'error',
      });
    },
  });

  return { addChannelMutation };
};

export default useHandleChannel;
