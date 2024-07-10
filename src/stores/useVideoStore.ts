import { create } from 'zustand';

interface IVideoState {
  videoOn: boolean;
  audioOn: boolean;
  setVideoOn: (videoOn: boolean) => void;
  setAudioOn: (audioOn: boolean) => void;
}

const useVideoStore = create<IVideoState>((set) => ({
  videoOn: false,
  audioOn: false,
  setVideoOn: (videoOn) => set({ videoOn }),
  setAudioOn: (audioOn) => set({ audioOn }),
}));

export default useVideoStore;
