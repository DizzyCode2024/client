import { IRoom } from "@/features/chat/types";
import { create } from "zustand";

interface IRoomState {
  rooms: IRoom[] | null;
  currentRoomId: number | null;
  setCurrentRoom: (roomId: number) => void;
  setRooms: (rooms: IRoom[]) => void;
}

const useRoomStore = create<IRoomState>((set) => ({
  rooms: [],
  currentRoomId: 0,
  setCurrentRoom: (roomId) => set({ currentRoomId: roomId }),
  setRooms: (rooms) => set({ rooms }),
}));

export default useRoomStore;
