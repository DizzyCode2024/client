import { IChannelPath, RoomId } from '@/features/room/types';

export const QUERY_KEYS = {
  ROOMS: ['rooms'],
  CATWCHANNELS: (roomId: RoomId) => ['catwChannels', roomId],
  EXPLORE_ROOMS: ['exploreRooms'],
  CHATS: (currentChannelPath: IChannelPath) => ['chats', currentChannelPath],
};
