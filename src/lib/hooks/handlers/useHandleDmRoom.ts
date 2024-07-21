import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { useCustomToast } from '@/lib/hooks/useCustomToast';
import {
  createDmRoomApi,
  fetchDmRoomDetailsApi,
  addMemberToRoomApi,
  removeMemberFromRoomApi,
  deleteDmRoomApi,
  getDmRooms,
} from '@/lib/api/afterLogin/dmApi';
import { IDmRoom } from '@/types/dm';

export interface DmRoomResponse {
  roomId: number;
  message: string;
}

const useHandleDmRoom = () => {
  const toast = useCustomToast();
  const queryClient = useQueryClient();

  const { mutate: addDmRoomMutation } = useMutation<
    DmRoomResponse,
    Error,
    IDmRoom
  >({
    mutationFn: createDmRoomApi,
    onSuccess: () => {
      toast({
        title: 'DM 방 생성 성공',
        description: '새로운 DM 방이 생성되었습니다.',
        status: 'success',
      });
      queryClient.invalidateQueries({ queryKey: ['dmRooms'] });
    },
    onError: (error) => {
      toast({
        title: 'DM 방 생성 실패',
        description:
          error.message || 'DM 방 생성에 실패하였습니다. 다시 시도해주세요.',
        status: 'error',
      });
    },
  });

  const useGetDmRoomsQuery = () => {
    return useQuery({
      queryKey: ['dmRooms'],
      queryFn: getDmRooms,
    });
  };

  const useFetchDmRoomDetails = (roomId: number) => {
    return useQuery(['dmRoomDetails', roomId], () =>
      fetchDmRoomDetailsApi(roomId),
    );
  };

  const { mutate: addMemberMutation } = useMutation({
    mutationFn: (roomId: number, username: string) =>
      addMemberToRoomApi(roomId, username),
    onSuccess: () => {
      toast({
        title: '멤버 추가 성공',
        description: '새로운 멤버가 DM 방에 추가되었습니다.',
        status: 'success',
      });
      queryClient.invalidateQueries({ queryKey: ['dmRooms'] });
    },
    onError: (error) => {
      toast({
        title: '멤버 추가 실패',
        description:
          error.message || '멤버 추가에 실패하였습니다. 다시 시도해주세요.',
        status: 'error',
      });
    },
  });

  const { mutate: removeMemberMutation } = useMutation({
    mutationFn: removeMemberFromRoomApi,
    onSuccess: () => {
      toast({
        title: '멤버 삭제 성공',
        description: '멤버가 DM 방에서 삭제되었습니다.',
        status: 'success',
      });
      queryClient.invalidateQueries({ queryKey: ['dmRooms'] });
    },
    onError: (error) => {
      toast({
        title: '멤버 삭제 실패',
        description:
          error.message || '멤버 삭제에 실패하였습니다. 다시 시도해주세요.',
        status: 'error',
      });
    },
  });

  const { mutate: deleteRoomMutation } = useMutation({
    mutationFn: deleteDmRoomApi,
    onSuccess: () => {
      toast({
        title: 'DM 방 삭제 성공',
        description: 'DM 방이 성공적으로 삭제되었습니다.',
        status: 'success',
      });
      queryClient.invalidateQueries({ queryKey: ['dmRooms'] });
    },
    onError: (error) => {
      toast({
        title: 'DM 방 삭제 실패',
        description:
          error.message || 'DM 방 삭제에 실패하였습니다. 다시 시도해주세요.',
        status: 'error',
      });
    },
  });

  return {
    addDmRoomMutation,
    useGetDmRoomsQuery,
    useFetchDmRoomDetails,
    addMemberMutation,
    removeMemberMutation,
    deleteRoomMutation,
  };
};

export default useHandleDmRoom;