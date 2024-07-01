import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { useCustomToast } from '@/hooks/useCustomToast';
import { useAuthStore } from '@/stores/useAuthStore';
import {
  sendFriendRequestById,
  sendFriendRequestByName,
  rejectFriendRequest,
  acceptFriendRequest,
  getFriendsList,
  getPendingFriendRequests,
  deleteFriendRequest,
} from '../api/friendApi';
import {
  IFriendRequestById,
  IFriendRequestByName,
  IFriendAction,
} from '../types';

const useHandleFriend = () => {
  const { user } = useAuthStore();
  const toast = useCustomToast();
  const queryClient = useQueryClient();

  const userId = Number(user!.id);

  const { mutate: sendFriendRequestByIdMutation } = useMutation<
    void,
    Error,
    Omit<IFriendRequestById, 'senderId'>
  >({
    mutationFn: async ({ friendId }) => {
      await sendFriendRequestById(userId, friendId);
    },
    onSuccess: () => {
      toast({
        title: '친구 요청 성공',
        description: '친구 요청이 성공적으로 전송되었습니다.',
        status: 'success',
      });
      queryClient.invalidateQueries({ queryKey: ['friends'] });
    },
    onError: () => {
      toast({
        title: '친구 요청 실패',
        description: '다시 시도해주세요.',
        status: 'error',
      });
    },
  });

  const { mutate: sendFriendRequestByNameMutation } = useMutation<
    void,
    Error,
    Omit<IFriendRequestByName, 'senderId'>
  >({
    mutationFn: async ({ friendName }) => {
      await sendFriendRequestByName(userId, friendName); // senderId에 userId 사용
    },
    onSuccess: () => {
      toast({
        title: '친구 요청 성공',
        description: '친구 요청이 성공적으로 전송되었습니다.',
        status: 'success',
      });
      queryClient.invalidateQueries({ queryKey: ['friends'] }); // queryKey를 배열로 지정
    },
    onError: () => {
      toast({
        title: '친구 요청 실패',
        description: '다시 시도해주세요.',
        status: 'error',
      });
    },
  });

  const { mutate: rejectFriendRequestMutation } = useMutation<
    void,
    Error,
    Omit<IFriendAction, 'member1Id'>
  >({
    mutationFn: async ({ member2Id }) => {
      await rejectFriendRequest(userId, member2Id);
    },
    onSuccess: () => {
      toast({
        title: '친구 요청 거절 성공',
        status: 'success',
      });
      queryClient.invalidateQueries({ queryKey: ['friends'] });
    },
    onError: () => {
      toast({
        title: '친구 요청 거절 실패',
        description: '다시 시도해주세요.',
        status: 'error',
      });
    },
  });

  const { mutate: acceptFriendRequestMutation } = useMutation<
    void,
    Error,
    Omit<IFriendAction, 'member1Id'>
  >({
    mutationFn: async ({ member2Id }) => {
      await acceptFriendRequest(userId, member2Id);
    },
    onSuccess: () => {
      toast({
        title: '친구 요청 수락 성공',
        status: 'success',
      });
      queryClient.invalidateQueries({ queryKey: ['friends'] });
    },
    onError: () => {
      toast({
        title: '친구 요청 수락 실패',
        description: '다시 시도해주세요.',
        status: 'error',
      });
    },
  });

  const { mutate: deleteFriendRequestMutation } = useMutation<
    void,
    Error,
    Omit<IFriendAction, 'member1Id'>
  >({
    mutationFn: async ({ member2Id }) => {
      await deleteFriendRequest(userId, member2Id);
    },
    onSuccess: () => {
      toast({
        title: '친구 삭제 성공',
        description: '친구가 성공적으로 삭제되었습니다.',
        status: 'success',
      });
      queryClient.invalidateQueries({ queryKey: ['friends'] });
    },
    onError: () => {
      toast({
        title: '친구 삭제 실패',
        description: '다시 시도해주세요.',
        status: 'error',
      });
    },
  });

  const useGetFriendsListQuery = () =>
    useQuery({
      queryKey: ['friends', userId],
      queryFn: () => getFriendsList(userId),
    });

  const useGetPendingFriendRequestsQuery = () =>
    useQuery({
      queryKey: ['pendingFriends', userId],
      queryFn: () => getPendingFriendRequests(userId),
    });

  return {
    sendFriendRequestByIdMutation,
    sendFriendRequestByNameMutation,
    rejectFriendRequestMutation,
    acceptFriendRequestMutation,
    deleteFriendRequestMutation,
    useGetFriendsListQuery,
    useGetPendingFriendRequestsQuery,
  };
};

export default useHandleFriend;
