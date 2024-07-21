import { create } from 'zustand';

interface IVoiceControllerState {
  videoOn: boolean;
  audioOn: boolean;
  screenShareOn: boolean;
  setVideoOn: (videoOn: boolean) => void;
  setAudioOn: (audioOn: boolean) => void;
  setScreenShareOn: (screenShareOn: boolean) => void;
}

const useVoiceControllerStore = create<IVoiceControllerState>((set) => ({
  videoOn: false,
  audioOn: false,
  screenShareOn: false,
  setVideoOn: (videoOn) => set({ videoOn }),
  setAudioOn: (audioOn) => set({ audioOn }),
  setScreenShareOn: (screenShareOn) => set({ screenShareOn }),
}));

export default useVoiceControllerStore;
