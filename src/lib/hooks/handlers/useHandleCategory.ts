import { QUERY_KEYS, createCategory } from '@/lib/api';
import { useCustomToast } from '@/lib/hooks/useCustomToast';
import { ICategory, RoomId } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useHandleCategory = () => {
  const toast = useCustomToast();
  const queryClient = useQueryClient();

  // add category
  const { mutate: addCatMutation } = useMutation<
    ICategory,
    Error,
    { roomId: RoomId; categoryName: string }
  >({
    mutationFn: createCategory,
    onSuccess: (data) => {
      // console.log('Category created:', data);
      toast({
        title: '카테고리 생성 성공',
        description: '새로운 카테고리가 생성되었습니다.',
        status: 'success',
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.CATWCHANNELS(data.roomId),
      });
    },
    onError: (error) => {
      console.error('Error creating category:', error);
      toast({
        title: '카테고리 생성 실패',
        description: '다시 시도해주세요.',
        status: 'error',
      });
    },
  });

  return { addCatMutation };
};

export default useHandleCategory;
