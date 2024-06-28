import { IChannelPath } from '@/features/room/types';
import { create } from 'zustand';

interface IRoomState {
  currentChannelPath: IChannelPath;
  setCurrentChannel: ({ roomId, categoryId, channelId }: IChannelPath) => void;

  currentChannelName: string;
  setCurrentChannelName: (name: string) => void;
}

const useRoomStore = create<IRoomState>((set) => ({
  currentChannelPath: { roomId: 0, categoryId: 0, channelId: 0 },
  setCurrentChannel: ({ roomId, categoryId, channelId }) =>
    set({ currentChannelPath: { roomId, categoryId, channelId } }),

  currentChannelName: '',
  setCurrentChannelName: (name) => set({ currentChannelName: name }),
}));

export default useRoomStore;
