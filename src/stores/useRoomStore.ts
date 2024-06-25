import { create } from 'zustand';

interface IRoomState {
  currentRoomId: number | null;
  setCurrentRoom: (roomId: number) => void;
}

const useRoomStore = create<IRoomState>((set) => ({
  currentRoomId: 0,
  setCurrentRoom: (roomId) => set({ currentRoomId: roomId }),
}));

export default useRoomStore;
