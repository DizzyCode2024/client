import { OpenVidu, Publisher, Session, StreamManager } from 'openvidu-browser';
import { create } from 'zustand';

interface IVoiceState {
  OV: OpenVidu | undefined;
  setOV: (OV: OpenVidu | undefined) => void;
  session: Session | undefined;
  setSession: (session: Session | undefined) => void;
  publisher: Publisher | undefined;
  setPublisher: (publisher: Publisher | undefined) => void;
  subscribers: StreamManager[];
  setSubscribers: (subscribers: StreamManager[]) => void;
  mainStreamManager: StreamManager | undefined;
  setMainStreamManager: (mainstreamManager: StreamManager | undefined) => void;
}

const useVoiceStateStore = create<IVoiceState>((set) => ({
  OV: undefined,
  setOV: (OV) => set({ OV }),
  session: undefined,
  setSession: (session) => set({ session }),
  publisher: undefined,
  setPublisher: (publisher) => set({ publisher }),
  subscribers: [],
  setSubscribers: (subscribers) => set({ subscribers }),
  mainStreamManager: undefined,
  setMainStreamManager: (mainStreamManager) => set({ mainStreamManager }),
}));

export default useVoiceStateStore;
