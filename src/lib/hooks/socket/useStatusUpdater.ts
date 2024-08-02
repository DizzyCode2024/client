import { useEffect } from 'react';
import { IRoom } from '@/types';
import useSocketStore from '@/lib/stores/useSocketStore';
import useStatusPayload from '@/lib/hooks/status/useStatusPayload';
import useStompClient from '@/lib/hooks/useStompClient';

const useStatusUpdater = (rooms: IRoom[] | undefined) => {
  const { client, isConnected } = useSocketStore();
  const { sendMessage } = useStompClient();
  const { onlinePayload, offlinePayload } = useStatusPayload();

  useEffect(() => {
    if (rooms && isConnected && client) {
      rooms.forEach((room) => {
        sendMessage(`/app/rooms/${room.roomId}/status`, onlinePayload);
      });
    }

    return () => {
      rooms?.forEach((room) => {
        sendMessage(`/app/rooms/${room.roomId}/status`, offlinePayload);
      });
    };
  }, [rooms, isConnected, client]);
};

export default useStatusUpdater;
