import { IDmChannelInfo, IDmChannelPath, IDmRoom, IDmVisit } from '@/types/dm';
import { create } from 'zustand';

interface IDmState {
  currentDmChannelPath: IDmChannelPath;
  setCurrentDmChannelPath: (path: IDmChannelPath) => void;

  currentDmChannelInfo: IDmChannelInfo;
  setCurrentDmChannelInfo: (info: IDmChannelInfo) => void;

  recentDmVisits: IDmVisit[];
  setRecentDmVisits: (visit: IDmVisit) => void;

  dmRooms: IDmRoom[];
  setDmRooms: (rooms: IDmRoom[]) => void;
  addDmRoom: (room: IDmRoom) => void;
  findDmRoomByUserId: (userId: string) => IDmRoom | undefined;
}

const useDmStore = create<IDmState>((set, get) => ({
  currentDmChannelPath: { roomId: 0, channelId: 0 },
  setCurrentDmChannelPath: (path) => {
    set({ currentDmChannelPath: path });
  },

  currentDmChannelInfo: { name: '', type: 'PRIVATE' },
  setCurrentDmChannelInfo: (info) => {
    set({ currentDmChannelInfo: info });
  },

  recentDmVisits: [],
  setRecentDmVisits: (visit) => {
    set((state) => ({
      recentDmVisits: [
        visit,
        ...state.recentDmVisits.filter(
          (v) => v.roomId !== visit.roomId || v.channelId !== visit.channelId,
        ),
      ],
    }));
  },

  dmRooms: [],
  setDmRooms: (rooms) => {
    set({ dmRooms: rooms });
  },
  addDmRoom: (room) => {
    set((state) => ({ dmRooms: [...state.dmRooms, room] }));
  },
  findDmRoomByUserId: (userId) => {
    console.log('Finding DM room for user ID:', userId);
    console.log(get().dmRooms);
    const rooms = get().dmRooms;

    let room = rooms.find((room) => room.userNames?.includes(userId));

    if (!room) {
      room = rooms.find((room) => room.temporaryRoomName === userId);
    }

    console.log('Found room:', room);
    return room;
  },
}));

export default useDmStore;
