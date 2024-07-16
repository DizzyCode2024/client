import { IRoom } from './room';

export type IRoomBox = IRoom & {
  isMember: boolean | undefined;
};
