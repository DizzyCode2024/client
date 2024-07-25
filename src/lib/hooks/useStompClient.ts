import { ISendChatPayload, IMember } from '@/types';
import useSocketStore from '@/lib/stores/useSocketStore';
import { IMessage, StompSubscription } from '@stomp/stompjs';

const useStompClient = () => {
  const { client, isConnected, setClient } = useSocketStore();
  const subscribe = (
    destination: string,
    callback: (message: IMessage) => void,
  ): StompSubscription | null => {
    if (!client || !isConnected) return null;
    return client.subscribe(destination, callback);
  };

  const unsubscribe = (subscription: StompSubscription) => {
    subscription.unsubscribe();
  };

  const sendMessage = (
    destination: string,
    body: ISendChatPayload | IMember,
  ) => {
    if (!client) {
      console.error('STOMP client is not initialized.');
      return;
    }
    if (!isConnected) {
      console.error('Client is not connected.');
      return;
    }
    try {
      const messageBody = JSON.stringify(body);
      client.publish({ destination, body: messageBody });
    } catch (error) {
      console.error('Publish error:', error);
    }
  };

  const deactivateSocket = () => {
    console.log('=========deactivate=========');
    client?.deactivate();
    setClient(null);
  };

  return {
    subscribe,
    unsubscribe,
    sendMessage,
    deactivateSocket,
  };
};

export default useStompClient;
