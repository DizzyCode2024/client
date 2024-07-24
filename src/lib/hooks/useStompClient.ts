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
    if (client && isConnected) {
      const messageBody = JSON.stringify(body);
      client.publish({
        destination,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: messageBody,
      });
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
