export type RoomId = number;
export type CategoryId = number;
export type ChannelId = number;
export type ChannelType = 'CHAT' | 'VOICE';

export interface IRoom {
  roomId: RoomId;
  roomName: string;
  open: boolean;
}

export interface CreateRoomResponse extends IRoom {
  categories: AboutCat[];
}

interface AboutCat {
  categoryId: CategoryId;
  categoryName: string;
  channels: Omit<IChannel, 'categoryId'>[];
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
