import axiosInstance from './axiosInstance';
import { IFriend } from '../../../types/friend';

export const sendFriendRequestById = async (
  senderId: number,
  receiverId: number,
): Promise<IFriend> => {
  const response = await axiosInstance.post(
    `/friendship/member1/${senderId}/member2/${receiverId}`,
    {
      friendId: receiverId,
      friendName: '',
      currentStatus: 'PENDING',
    },
  );
  return response.data;
};

export const sendFriendRequestByName = async (
  senderId: number,
  username: string,
): Promise<IFriend> => {
  const response = await axiosInstance.post(
    `/friendship/member1/${senderId}/member2_name/${username}`,
    {
      friendId: 0,
      friendName: username,
      currentStatus: 'PENDING',
    },
  );
  return response.data;
};

export const rejectFriendRequest = async (
  member1Id: number,
  member2Id: number,
): Promise<IFriend> => {
  const response = await axiosInstance.post(
    `/friendship/reject/member1/${member1Id}/member2/${member2Id}`,
    {
      friendId: member2Id,
      friendName: '',
      currentStatus: 'REJECTED',
    },
  );
  return response.data;
};

export const acceptFriendRequest = async (
  member1Id: number,
  member2Id: number,
): Promise<IFriend> => {
  const response = await axiosInstance.post(
    `/friendship/accept/member1/${member1Id}/member2/${member2Id}`,
    {
      friendId: member2Id,
      friendName: '',
      currentStatus: 'ACCEPTED',
    },
  );
  return response.data;
};

export const getFriendsList = async (memberId: number): Promise<IFriend[]> => {
  const response = await axiosInstance.get(`/friendship/member/${memberId}`);
  return response.data;
};

export const getPendingFriendRequests = async (
  memberId: number,
): Promise<IFriend[]> => {
  const response = await axiosInstance.get(
    `/friendship/pending/member/${memberId}`,
  );
  return response.data;
};

export const deleteFriendRequest = async (
  member1Id: number,
  member2Id: number,
): Promise<void> => {
  await axiosInstance.delete(
    `/friendship/member1/${member1Id}/member2/${member2Id}`,
  );
};
