import { useNavigate } from 'react-router-dom';
import useDmStore from '@/lib/stores/useDmStore';
import { useAuthStore } from '@/lib/stores/useAuthStore';
import useHandleDmRoom from '../handlers/useHandleDmRoom';

export function useOnClickDM() {
  const navigate = useNavigate();
  const { findDmRoomByUserId } = useDmStore();
  const { user } = useAuthStore();
  const { addDmRoomMutation } = useHandleDmRoom();

  return (friendName: string) => {
    console.log('onClickDM called with userID:', friendName);
    const existingRoom = findDmRoomByUserId(friendName);

    if (existingRoom === undefined) {
      console.log('No existing room found, creating new room for:', friendName);
      if (user?.username) {
        const dmName = [user.username, friendName].join(', ');
        const userNames = [user.username, friendName];
        addDmRoomMutation({
          roomName: dmName,
          userNames,
          roomId: 0,
          memberCount: 0,
          temporaryRoomName: null,
        });
      } else {
        console.error('User is not logged in');
      }
    } else {
      navigate(`/chat/main/${existingRoom.roomId}`);
    }
  };
}
