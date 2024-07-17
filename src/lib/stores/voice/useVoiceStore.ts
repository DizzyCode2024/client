import { create } from 'zustand';

interface IVoiceState {
  videoOn: boolean;
  audioOn: boolean;
  screenShareOn: boolean;
  setVideoOn: (videoOn: boolean) => void;
  setAudioOn: (audioOn: boolean) => void;
  setScreenShareOn: (screenShareOn: boolean) => void;
}

const useVoiceStore = create<IVoiceState>((set) => ({
  videoOn: false,
  audioOn: false,
  screenShareOn: false,
  setVideoOn: (videoOn) => set({ videoOn }),
  setAudioOn: (audioOn) => set({ audioOn }),
  setScreenShareOn: (screenShareOn) => set({ screenShareOn }),
}));

export default useVoiceStore;
