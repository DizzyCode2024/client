import { IFriend } from '@/types/friend';
import { create } from 'zustand';

interface FriendState {
  friends: IFriend[];
  setFriends: (friends: IFriend[]) => void;
  findFriendByName: (friendName: string) => IFriend | undefined;
}

const useFriendStore = create<FriendState>((set, get) => ({
  friends: [],
  setFriends: (friends: IFriend[]) => set({ friends }),
  findFriendByName: (friendName: string) => {
    const { friends } = get();
    return friends.find((friend) => friend.friendName === friendName);
  },
}));

export default useFriendStore;
