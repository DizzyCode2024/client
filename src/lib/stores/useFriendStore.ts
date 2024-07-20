import { IFriend } from '@/types/friend';
import { create } from 'zustand';

interface FriendState {
  friends: IFriend[];
  setFriends: (friends: IFriend[]) => void;
}

const useFriendStore = create<FriendState>((set) => ({
  friends: [],
  setFriends: (friends: IFriend[]) => set({ friends }),
}));

export default useFriendStore;
