import { useEffect, useRef, useState } from 'react';
import { Client, IMessage, StompSubscription } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const useStompClient = (brokerURL: string) => {
  const client = useRef<Client | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socket = new SockJS(brokerURL);
    client.current = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        setIsConnected(true);
        console.log(`Connected to server ${brokerURL}`);
      },
      onDisconnect: () => {
        setIsConnected(false);
        console.log('Disconnected from server');
      },
      debug: (str) => {
        console.log(`STOMP Debug: ${str}`);
      },
    });

    client.current.activate();

    return () => {
      client.current?.deactivate();
    };
  }, [brokerURL]);

  const subscribe = (
    destination: string,
    callback: (message: IMessage) => void,
  ): StompSubscription | null => {
    if (!client.current || !isConnected) return null;
    return client.current.subscribe(destination, callback);
  };

  const unsubscribe = (subscription: StompSubscription) => {
    subscription.unsubscribe();
  };

  const sendMessage = (destination: string, body: string) => {
    if (client.current && isConnected) {
      client.current.publish({ destination, body });
    }
  };

  return {
    isConnected,
    subscribe,
    unsubscribe,
    sendMessage,
  };
};

export default useStompClient;
