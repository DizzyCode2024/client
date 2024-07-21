import { IDmChannelInfo, IDmChannelPath, IDmRoom } from '@/types/dm';
import { create } from 'zustand';

interface IDmState {
  currentDmChannelPath: IDmChannelPath;
  setCurrentDmChannelPath: (path: IDmChannelPath) => void;

  currentDmChannelInfo: IDmChannelInfo;
  setCurrentDmChannelInfo: (info: IDmChannelInfo) => void;

  recentDmVisits: IDmChannelPath[];
  setRecentDmVisits: (roomId: number, channelId: number) => void;

  dmRooms: IDmRoom[];
  setDmRooms: (rooms: IDmRoom[]) => void;
}

const useDmStore = create<IDmState>((set) => ({
  currentDmChannelPath: { roomId: 0, channelId: 0 },
  setCurrentDmChannelPath: (path) => {
    set({ currentDmChannelPath: path });
  },

  currentDmChannelInfo: { name: '', type: 'PRIVATE' },
  setCurrentDmChannelInfo: (info) => {
    set({ currentDmChannelInfo: info });
  },

  recentDmVisits: [],
  setRecentDmVisits: (roomId, channelId) => {
    set((state) => ({
      recentDmVisits: [
        { roomId, channelId },
        ...state.recentDmVisits.filter(
          (v) => v.roomId !== roomId || v.channelId !== channelId,
        ),
      ],
    }));
  },

  dmRooms: [],
  setDmRooms: (rooms) => {
    set({ dmRooms: rooms });
  },
}));

export default useDmStore;
