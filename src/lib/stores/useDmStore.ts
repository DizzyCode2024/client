import { create } from 'zustand';
import { IDmRoom, IDmChannelPath, IDmVisit } from '@/types/dm';

interface IDmState {
  currentDmChannelPath: IDmChannelPath;
  setCurrentDmChannelPath: (path: IDmChannelPath) => void;
  currentDmChannelInfo: IDmRoom;
  setCurrentDmChannelInfo: (info: IDmRoom) => void;
  currentDmRoom: IDmRoom | null;
  setCurrentDmRoom: (room: IDmRoom | null) => void;
  recentDmVisits: IDmVisit[];
  setRecentDmVisits: (visits: IDmVisit[]) => void;
  dmRooms: IDmRoom[];
  setDmRooms: (rooms: IDmRoom[]) => void;
  addDmRoom: (room: IDmRoom) => void;
  findDmRoomByUserName: (userId: string) => IDmRoom | undefined;
}
const useDmStore = create<IDmState>((set, get) => ({
  currentDmChannelPath: { roomId: 0, channelId: 0 },
  setCurrentDmChannelPath: (path) => set({ currentDmChannelPath: path }),

  currentDmChannelInfo: {
    roomId: 0,
    roomName: '',
    userNames: [],
    open: false,
    memberCount: 0,
    temporaryRoomName: null,
  },
  setCurrentDmChannelInfo: (info: IDmRoom) =>
    set({ currentDmChannelInfo: info }),

  currentDmRoom: null,
  setCurrentDmRoom: (room: IDmRoom | null) => set({ currentDmRoom: room }),

  recentDmVisits: [],
  setRecentDmVisits: (visits: IDmVisit[]) => set({ recentDmVisits: visits }),

  dmRooms: [],
  setDmRooms: (rooms: IDmRoom[]) => set({ dmRooms: rooms }),
  addDmRoom: (room: IDmRoom) =>
    set((state) => ({ dmRooms: [...state.dmRooms, room] })),

  findDmRoomByUserName: (userId: string) => {
    console.log('Finding DM room for user ID:', userId);
    const rooms = get().dmRooms;
    let room = rooms.find((room) => room.userNames?.includes(userId));
    if (!room) {
      room = rooms.find((room) => room.temporaryRoomName === userId);
    }
    return room;
  },
}));

export default useDmStore;
