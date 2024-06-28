import { Client, IMessage, StompSubscription } from '@stomp/stompjs';
import { useRef, useState } from 'react';

const useStompClient = () => {
  const client = useRef<Client | null>(null);
  const [isConnected, setIsConnected] = useState(false);

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
    client,
    isConnected,
    setIsConnected,
    subscribe,
    unsubscribe,
    sendMessage,
  };
};

export default useStompClient;
