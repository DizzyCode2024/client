import { useEffect } from 'react';
import useStompClient from '../useStompClient';
import useStatusPayload from './useStatusPayload';

const useHeartbeat = (interval: number) => {
  const { sendMessage } = useStompClient();
  const { onlinePayload } = useStatusPayload();

  const heartbeat = () => {
    console.log('HEARTBEAT', onlinePayload);
    sendMessage('/app/members/status/heartbeat', onlinePayload);
  };

  useEffect(() => {
    const intervalId = setInterval(heartbeat, interval);

    return () => clearInterval(intervalId);
  }, [interval]);
};

export default useHeartbeat;
