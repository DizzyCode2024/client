import { useNavigate } from 'react-router-dom';
import useDmStore from '@/lib/stores/useDmStore';
import { useAuthStore } from '@/lib/stores/useAuthStore';

export function useOnClickDM(friendName: string) {
  const navigate = useNavigate();
  const { findDmRoomByUserId } = useDmStore();
  const { user } = useAuthStore();
  const { addDmRoomMutation } = useDmRoom();

  console.log('onClickDM called with userID:', friendName);
  const existingRoom = findDmRoomByUserId(friendName);

  if (existingRoom === undefined) {
    console.log('No existing room found, creating new room for:', friendName);
    const dmName = [user?.username, friendName].join(', ');
    const userNames = [user?.username, friendName];
    addDmRoomMutation({ roomName: dmName, userNames });
  } else {
    navigate(`/chat/main/${existingRoom.roomId}`);
  }
}
function useDmRoom(): { addDmRoomMutation: any } {
  throw new Error('Function not implemented.');
}
