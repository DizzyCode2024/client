export interface IFriendRequest {
  friendId: number;
  friendName: string;
  currentStatus: string;
}

export interface IFriendRequestById {
  senderId: number;
  friendId: number;
}

export interface IFriendRequestByName {
  senderId: number;
  friendName: string;
}

export interface IFriendAction {
  member1Id: number;
  member2Id: number;
}
