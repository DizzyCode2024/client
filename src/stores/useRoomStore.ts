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

const useRoomStore = create<IRoomState>((set, get) => ({
  currentChannelPath: { roomId: 0, categoryId: 0, channelId: 0 },
  // setCurrentChannelPath: ({ roomId, categoryId, channelId }) =>
  //   set({ currentChannelPath: { roomId, categoryId, channelId } }),
  setCurrentChannelPath: ({ roomId, categoryId, channelId }) => {
    const currentPath = get().currentChannelPath;
    if (
      currentPath.roomId !== roomId ||
      currentPath.categoryId !== categoryId ||
      currentPath.channelId !== channelId
    ) {
      set({ currentChannelPath: { roomId, categoryId, channelId } });
    }
  },

  currentChannelInfo: { name: '', type: 'CHAT' },
  // setCurrentChannelInfo: (info) => set({ currentChannelInfo: info }),
  setCurrentChannelInfo: (info) => {
    const currentInfo = get().currentChannelInfo;
    if (currentInfo.name !== info.name || currentInfo.type !== info.type) {
      set({ currentChannelInfo: info });
    }
  },
}));

export default useRoomStore;
