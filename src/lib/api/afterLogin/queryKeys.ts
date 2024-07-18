import { IChannelPath, RoomId } from '@/types/room';

export const QUERY_KEYS = {
  ROOMS: ['rooms'],
  CATWCHANNELS: (roomId: RoomId) => ['catwChannels', roomId],
  EXPLORE_ROOMS: ['exploreRooms'],
  CHATS: (currentChannelPath: IChannelPath) => ['chats', currentChannelPath],
  MEMBERS: (roomId: RoomId) => ['members', roomId],
};
