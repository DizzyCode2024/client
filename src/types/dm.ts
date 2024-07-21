export type RoomId = number;
export type UserId = string;

export interface IDmRoom {
  roomId: RoomId;
  roomName: string;
  userNames: UserId[];
  memberCount: number;
  temporaryRoomName: string | null;
}
export interface IDmChannelInfo {
  name: string;
  type: 'PRIVATE' | 'GROUP';
}

export interface IDmChannelPath {
  roomId: RoomId;
  channelId: number;
}

export interface IDmVisit {
  roomId: RoomId;
  channelId: number;
  lastVisited: Date;
}

export interface IDmState {
  currentChannel: IDmChannelPath;
  recentVisits: IDmVisit[];
  favoriteChannels: IDmChannelPath[];
}
