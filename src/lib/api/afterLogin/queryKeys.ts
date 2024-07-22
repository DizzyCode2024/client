import { IChannelPath, RoomId } from '@/types';

export const QUERY_KEYS = {
  ROOMS: ['rooms'],
  CATWCHANNELS: (roomId: RoomId) => ['catwChannels', roomId],
  EXPLORE_ROOMS: ['exploreRooms'],
  CHATS: (currentChannelPath: IChannelPath) => ['chats', currentChannelPath],
  MEMBERS: (roomId: RoomId) => ['members', roomId],
  DM_ROOMS: ['dmRooms'],
};
