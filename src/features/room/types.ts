export type RoomId = number;
export type CategoryId = number;
export type ChannelId = number;
export type ChannelType = 'CHAT' | 'VOICE';

export interface IRoom {
  roomId: RoomId;
  roomName: string;
  open: boolean;
}

// category
export interface ICategoryBase {
  roomId: RoomId;
  categoryId: number;
  categoryName: string;
}

export interface ICategory extends ICategoryBase {}

export interface IChannel {
  categoryId: CategoryId;
  channelId: ChannelId;
  channelName: string;
  channelType: ChannelType;
}

export interface ICatwChannel extends ICategoryBase {
  channels: IChannel[] | null;
}

export interface IChannelPath {
  roomId: RoomId;
  categoryId: CategoryId;
  channelId: ChannelId;
}
