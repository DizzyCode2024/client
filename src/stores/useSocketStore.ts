import { Client } from '@stomp/stompjs';
import { create } from 'zustand';

interface ISocketState {
  client: Client | null;
  isConnected: boolean;
  setClient: (client: Client | null) => void;
  setIsConnected: (isConnected: boolean) => void;
}

const useSocketStore = create<ISocketState>((set) => ({
  client: null,
  isConnected: false,
  setClient: (client) => set({ client }),
  setIsConnected: (isConnected) => set({ isConnected }),
}));

export default useSocketStore;
