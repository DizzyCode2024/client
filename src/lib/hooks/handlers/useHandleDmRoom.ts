import { QUERY_KEYS } from '@/lib/api';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { useCustomToast } from '@/lib/hooks/useCustomToast';
import { useNavigate } from 'react-router-dom';
import {
  createDmRoomApi,
  fetchDmRoomDetailsApi,
  addMemberToRoomApi,
  removeMemberFromRoomApi,
  deleteDmRoomApi,
  getDmRooms,
} from '@/lib/api/afterLogin/dmApi';
import { IDmRoom, RoomId } from '@/types/dm';
import useDmStore from '@/lib/stores/useDmStore';

export interface DmRoomResponse {
  roomId: number;
  message: string;
}

export interface MemberMutationParams {
  roomId: RoomId;
  username: string;
}

const useHandleDmRoom = () => {
  const toast = useCustomToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    setCurrentDmRoom,
    setCurrentDmId,
    dmRooms,
    currentDmId,
    currentFriend,
  } = useDmStore();

  const { mutate: addDmRoomMutation } = useMutation<
    DmRoomResponse,
    Error,
    IDmRoom
  >({
    mutationFn: createDmRoomApi,
    onSuccess: (data) => {
      setCurrentDmId(data.roomId);
      const currentRoom = dmRooms.find((room) => room.roomId === currentDmId);
      if (currentRoom) setCurrentDmRoom(currentRoom);
      queryClient.invalidateQueries({ queryKey: ['dmRooms'] });
      navigate(`/chat/main/${data.roomId}`);
      if (currentFriend?.friendName) {
        toast({
          title: 'DM 방 입장',
          description: `${currentFriend.friendName}님의 DM 방에 입장하였습니다.`,
          status: 'success',
        });
      }
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

  const useDmRoomDetails = (roomId: RoomId) => {
    return useQuery({
      queryKey: ['dmRoomDetails', roomId],
      queryFn: () => fetchDmRoomDetailsApi(roomId),
    });
  };
  const { mutate: addMemberMutation } = useMutation<
    any,
    Error,
    MemberMutationParams
  >({
    mutationFn: addMemberToRoomApi,
    onSuccess: (data) => {
      toast({
        title: '멤버 추가 성공',
        description: '새로운 멤버가 DM 방에 추가되었습니다.',
        status: 'success',
      });
      queryClient.invalidateQueries({ queryKey: ['dmRooms'] });
      navigate(`/chat/main/${data.roomId}`);
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

  const { mutate: removeMemberMutation } = useMutation<
    any,
    Error,
    MemberMutationParams
  >({
    mutationFn: (params: MemberMutationParams) =>
      removeMemberFromRoomApi(params.roomId, params.username),
    onSuccess: () => {
      toast({
        title: '탈퇴 성공',
        description: '해당 DM 방에서 탈퇴되었습니다.',
        status: 'success',
      });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.DM_ROOMS });
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
    useDmRoomDetails,
    addMemberMutation,
    removeMemberMutation,
    deleteRoomMutation,
  };
};

export default useHandleDmRoom;
