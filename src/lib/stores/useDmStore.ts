import { create } from 'zustand';
import { IDmRoom } from '@/types/dm';
import { ICurrentFriend } from '@/types/friend';

interface IDmState {
  currentDmId: number | 0;
  setCurrentDmId: (id: number) => void;
  currentDmRoom: IDmRoom | null;
  setCurrentDmRoom: (room: IDmRoom | null) => void;
  dmRooms: IDmRoom[];
  setDmRooms: (rooms: IDmRoom[]) => void;
  addDmRoom: (room: IDmRoom) => void;
  findRoomIdByUserNames: (userNames: string[]) => number | null | undefined;
  currentFriend: ICurrentFriend | null;
  setCurrentFriend: (friend: ICurrentFriend | null) => void;
}

const useDmStore = create<IDmState>((set, get) => ({
  currentDmId: 0,
  setCurrentDmId: (id: number) => set({ currentDmId: id }),
  currentDmRoom: null,
  setCurrentDmRoom: (room: IDmRoom | null) => set({ currentDmRoom: room }),

  dmRooms: [],
  setDmRooms: (rooms: IDmRoom[]) => set({ dmRooms: rooms }),
  addDmRoom: (room: IDmRoom) =>
    set((state) => ({ dmRooms: [...state.dmRooms, room] })),

  findRoomIdByUserNames: (userNames: string[]) => {
    const rooms = get().dmRooms;
    const room = rooms.find(
      (room) =>
        room.userNames &&
        userNames.length === room.userNames.length &&
        userNames.every((userName) => room.userNames?.includes(userName)),
    );
    return room ? room.roomId : undefined;
  },
  currentFriend: null,
  setCurrentFriend: (friend: ICurrentFriend | null) =>
    set({ currentFriend: friend }),
}));

export default useDmStore;
