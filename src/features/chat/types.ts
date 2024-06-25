export interface ChatMessage {
  sender: string;
  content: string;
  type: string;
}

export type RoomId = number;
export type CategoryId = number;
export type ChannelId = number;

export interface IRoom {
  roomId: RoomId;
  roomName: string;
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
}

export interface ICatwChannel extends ICategoryBase {
  channels: IChannel[] | null;
}
