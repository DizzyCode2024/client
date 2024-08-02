import useSocketStore from '@/lib/stores/useSocketStore';
import { BROKER_URL } from '@/lib/utils/config';
import { Client } from '@stomp/stompjs';
import { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';

import { getSecondaryToken } from '@/lib/api';
import useStompClient from '../useStompClient';

const useSocketConnection = () => {
  const [ST, setST] = useState<string | null>(null);

  const { setClient, setIsConnected } = useSocketStore();
  const { deactivateSocket } = useStompClient();

  // get secondary token
  const getST = async () => {
    const token = await getSecondaryToken();
    setST(token);
  };

  useEffect(() => {
    getST();
    if (ST) {
      const socket = new SockJS(`${BROKER_URL}?token=${ST}`);
      const stompClient = new Client({
        webSocketFactory: () => socket,
        connectHeaders: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        onConnect: () => {
          setIsConnected(true);
          console.log(`Connected to server ${BROKER_URL}`);
        },
        onDisconnect: () => {
          setIsConnected(false);
          console.log('Disconnected from server');
        },
        debug: (str) => {
          console.log(`STOMP Debug: ${str}`);
        },
      });
      stompClient.activate();
      setClient(stompClient);
    }

    return () => {
      deactivateSocket();
      setST(null);
    };
  }, [setClient, setIsConnected, ST]);
};

export default useSocketConnection;
