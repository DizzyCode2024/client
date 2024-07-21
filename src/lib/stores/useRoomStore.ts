import { ChannelType, IChannelPath } from '@/types';
import { create } from 'zustand';

type IChannelInfo = {
  name: string;
  type: ChannelType;
};

// 최근 방문한 url 기록 (방별로 저장)
//    방문 기록 없으면 해당 방의 첫 채널 url로 이동
// type UrlPath = Omit<IChannelPath, 'categoryId'>; // roomId, channelId
// type UrlPaths = UrlPath[];

interface IRoomState {
  // recentVisits: UrlPaths;
  // setRecentVisits: (roomId: number, channelId: number) => void;

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
  // recentVisits: [],
  // setRecentVisits: (roomId, channelId) => {
  //   const recentVisits = get().recentVisits;
  //   const newRecentVisits = recentVisits.filter(
  //     (visit) => visit.roomId !== roomId,
  //   );
  //   set({ recentVisits: [{ roomId, channelId }, ...newRecentVisits] });
  // },

  currentChannelPath: { roomId: 0, categoryId: 0, channelId: 0 },
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
  setCurrentChannelInfo: (info) => {
    const currentInfo = get().currentChannelInfo;
    if (currentInfo.name !== info.name || currentInfo.type !== info.type) {
      set({ currentChannelInfo: info });
    }
  },
}));

export default useRoomStore;
