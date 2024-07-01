import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { useCustomToast } from '@/hooks/useCustomToast';
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
  const toast = useCustomToast();
  const queryClient = useQueryClient();

  const { mutate: sendFriendRequestByIdMutation } = useMutation<
    any,
    Error,
    IFriendRequestById
  >({
    mutationFn: ({ senderId, friendId }) =>
      sendFriendRequestById(senderId, friendId),
    onSuccess: () => {
      toast({
        title: '친구 요청 성공',
        description: '친구 요청이 성공적으로 전송되었습니다.',
        status: 'success',
      });
      queryClient.invalidateQueries({ queryKey: 'friends' });
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
    any,
    Error,
    IFriendRequestByName
  >({
    mutationFn: ({ senderId, friendName }) =>
      sendFriendRequestByName(senderId, friendName),
    onSuccess: () => {
      toast({
        title: '친구 요청 성공',
        description: '친구 요청이 성공적으로 전송되었습니다.',
        status: 'success',
      });
      queryClient.invalidateQueries({ queryKey: 'friends' });
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
    IFriendAction
  >({
    mutationFn: ({ member1Id, member2Id }) =>
      rejectFriendRequest(member1Id, member2Id),
    onSuccess: () => {
      toast({
        title: '친구 요청 거절 성공',
        status: 'success',
      });
      queryClient.invalidateQueries({ queryKey: 'friends' });
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
    IFriendAction
  >({
    mutationFn: ({ member1Id, member2Id }) =>
      acceptFriendRequest(member1Id, member2Id),
    onSuccess: () => {
      toast({
        title: '친구 요청 수락 성공',
        status: 'success',
      });
      queryClient.invalidateQueries({ queryKey: 'friends' });
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
    IFriendAction
  >({
    mutationFn: ({ member1Id, member2Id }) =>
      deleteFriendRequest(member1Id, member2Id),
    onSuccess: () => {
      toast({
        title: '친구 삭제 성공',
        description: '친구가 성공적으로 삭제되었습니다.',
        status: 'success',
      });
      queryClient.invalidateQueries({ queryKey: 'friends' });
    },
    onError: () => {
      toast({
        title: '친구 삭제 실패',
        description: '다시 시도해주세요.',
        status: 'error',
      });
    },
  });

  const useGetFriendsListQuery = (memberId: number) =>
    useQuery(['friends', memberId], () => getFriendsList(memberId));

  const useGetPendingFriendRequestsQuery = (memberId: number) =>
    useQuery(['pendingFriends', memberId], () =>
      getPendingFriendRequests(memberId),
    );

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
