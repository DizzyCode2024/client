import { create } from 'zustand';

interface ISocketState {
  isConnected: boolean;
  setIsConnected: (isConnected: boolean) => void;
}

const useSocketStore = create<ISocketState>((set) => ({
  isConnected: false,
  setIsConnected: (isConnected) => set({ isConnected }),
}));

export default useSocketStore;
