import { ISendChatPayload } from '@/features/chat/types';
import useSocketStore from '@/stores/useSocketStore';
import { IMessage, StompSubscription } from '@stomp/stompjs';

const useStompClient = () => {
  const { client, isConnected } = useSocketStore();

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

  const sendMessage = (destination: string, body: ISendChatPayload) => {
    if (client && isConnected) {
      const messageBody = JSON.stringify(body);
      client.publish({ destination, body: messageBody });
    }
  };

  return {
    subscribe,
    unsubscribe,
    sendMessage,
  };
};

export default useStompClient;
