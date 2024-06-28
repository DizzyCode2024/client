import { IRoom } from '../room/types';

export type IRoomBox = IRoom & {
  isMember: boolean | undefined;
};
