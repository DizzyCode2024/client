export interface ChatMessage {
  sender: string;
  content: string;
  type: string;
}

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
  channelId: number;
  channelName: string;
  channelType: ChannelType;
}

export interface ICatwChannel extends ICategoryBase {
  channels: IChannel[] | null;
}
