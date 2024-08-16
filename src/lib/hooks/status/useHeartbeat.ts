import { useEffect } from 'react';
import useStompClient from '../useStompClient';
import useStatusPayload from './useStatusPayload';

const useHeartbeat = (interval: number) => {
  const { sendMessage } = useStompClient();
  const { onlinePayload } = useStatusPayload();

  useEffect(() => {
    const heartbeat = () => {
      sendMessage('/app/members/status/heartbeat', onlinePayload);
    };
    const intervalId = setInterval(() => {
      heartbeat();
    }, interval);

    return () => clearInterval(intervalId);
  }, [interval, onlinePayload, sendMessage]);
};

export default useHeartbeat;
