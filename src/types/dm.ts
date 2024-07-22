export type RoomId = number;
export type UserId = string;

export interface IDmRoom {
  roomId: RoomId;
  roomName: string;
  userNames: UserId[];
  open: boolean;
  memberCount: number;
  temporaryRoomName: string | null;
}

export interface IDmRoomCreation {
  roomName: string;
  userNames: UserId[];
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
  dmRooms: IDmRoom[];
  setDmRooms: (rooms: IDmRoom[]) => void;
  addDmRoom: (room: IDmRoom) => void;
  findDmRoomByUserId: (userId: UserId) => IDmRoom | undefined;
}
