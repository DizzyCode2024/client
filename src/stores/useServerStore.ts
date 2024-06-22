import { IServer } from "@/features/chat/types";
import { create } from "zustand";

interface IServerState {
  servers: IServer[] | null;
  currentServerId: number | null;
  setCurrentServer: (serverId: number) => void;
}

const useServerStore = create<IServerState>((set) => ({
  servers: [
    {
      id: 1,
      name: "서버1",
    },
    {
      id: 2,
      name: "서버2",
    },
  ],
  currentServerId: 1,
  setCurrentServer: (serverId) => set({ currentServerId: serverId }),
}));

export default useServerStore;
