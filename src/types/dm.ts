export type RoomId = number;
export type UserId = string;

// DM 방 정보
export interface IDmRoom {
  roomId: RoomId;
  roomName: string;
  userNames: UserId[];
  open: boolean;
  memberCount: number;
  temporaryRoomName: string;
}

// DM 방 생성을 위한 인터페이스
export interface IDmRoomCreation {
  roomName: string;
  userNames: UserId[];
}
