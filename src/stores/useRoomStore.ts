import { ChannelType, IChannelPath } from '@/features/room/types';
import { create } from 'zustand';

type IChannelInfo = {
  name: string;
  type: ChannelType;
};

interface IRoomState {
  currentChannelPath: IChannelPath;
  setCurrentChannelPath: ({
    roomId,
    categoryId,
    channelId,
  }: IChannelPath) => void;

  currentChannelInfo: IChannelInfo;
  setCurrentChannelInfo: (info: IChannelInfo) => void;
}

const useRoomStore = create<IRoomState>((set) => ({
  currentChannelPath: { roomId: 0, categoryId: 0, channelId: 0 },
  setCurrentChannelPath: ({ roomId, categoryId, channelId }) =>
    set({ currentChannelPath: { roomId, categoryId, channelId } }),

  currentChannelInfo: { name: '', type: 'CHAT' },
  setCurrentChannelInfo: (info) => set({ currentChannelInfo: info }),
}));

export default useRoomStore;
