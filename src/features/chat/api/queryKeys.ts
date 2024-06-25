import { RoomId } from '../types';

export const QUERY_KEYS = {
  ROOMS: ['rooms'],
  CATWCHANNELS: (roomId: RoomId) => ['catwChannels', roomId],
};
