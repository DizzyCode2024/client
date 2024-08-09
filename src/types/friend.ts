export interface IFriend {
  [x: string]: any;
  friendId: number;
  friendName: string;
  currentStatus: string;
}

export interface IFriendRequestById {
  senderId: number;
  friendId: number;
  n;
}

export interface IFriendRequestByName {
  senderId: number;
  friendName: string;
}

export interface IFriendAction {
  member1Id: number;
  member2Id: number;
}

export interface ICurrentFriend {
  friendId: number;
  friendName: string;
}
