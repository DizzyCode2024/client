import { useNavigate } from 'react-router-dom';
import useDmStore from '@/lib/stores/useDmStore';
import { useAuthStore } from '@/lib/stores/useAuthStore';
import useHandleDmRoom from '../handlers/useHandleDmRoom';

export function useOnClickDM(friendName: string) {
  const navigate = useNavigate();
  const { findDmRoomByUserId } = useDmStore();
  const { user } = useAuthStore();
  const { addDmRoomMutation } = useHandleDmRoom();

  const existingRoom = findDmRoomByUserId(friendName);

  if (existingRoom === undefined) {
    return () => {
      console.log('No existing room found, creating new room for:', friendName);
      const dmName = [user?.username, friendName].join(', ');
      const userNames = [user?.username, friendName];
      addDmRoomMutation({ roomName: dmName, userNames });
    };
  }
  return () => {
    navigate(`/chat/main/${existingRoom.roomId}`);
  };
}
