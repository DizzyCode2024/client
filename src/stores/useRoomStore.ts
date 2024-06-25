import { RoomId } from '@/features/chat/types';
import { create } from 'zustand';

interface IRoomState {
  currentRoomId: RoomId;
  setCurrentRoom: (roomId: RoomId) => void;
}

const useRoomStore = create<IRoomState>((set) => ({
  currentRoomId: 0,
  setCurrentRoom: (roomId) => set({ currentRoomId: roomId }),
}));

export default useRoomStore;
