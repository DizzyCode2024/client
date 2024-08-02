import { CategoryId, ChannelId, ChannelType, RoomId } from '@/types';
import { create } from 'zustand';

type IVoicePath = {
  roomId: RoomId;
  categoryId: CategoryId;
  channelId: ChannelId;
};

interface IConnectedVoiceState {
  connectedVoicePath: IVoicePath;
  setConnectedVoicePath: (voicePath: IVoicePath) => void;
  connectedVoiceInfo: { name: string; type: ChannelType };
  setConnectedVoiceInfo: (info: { name: string; type: ChannelType }) => void;
}

const useConnectedVoiceStore = create<IConnectedVoiceState>((set) => ({
  connectedVoicePath: { roomId: 0, categoryId: 0, channelId: 0 },
  setConnectedVoicePath: ({ roomId, categoryId, channelId }) => {
    set({ connectedVoicePath: { roomId, categoryId, channelId } });
  },
  connectedVoiceInfo: { name: '', type: 'VOICE' },
  setConnectedVoiceInfo: (info) => {
    set({ connectedVoiceInfo: info });
  },
}));

export default useConnectedVoiceStore;
