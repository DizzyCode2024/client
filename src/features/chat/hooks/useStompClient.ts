import { Client } from "@stomp/stompjs";
import { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import { ChatMessage } from "../types";

const useStompClient = (
  brokerURL: string,
  topic: string,
  onMessageReceived: (message: ChatMessage) => void
) => {
  const client = useRef<Client | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socket = new SockJS(brokerURL);

    client.current = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        console.log("Connected successfully");
        setIsConnected(true);
        subscribe();
      },
      onDisconnect: () => {
        console.log("Disconnected");
        setIsConnected(false);
      },
      debug: (str) => {
        console.log(str);
      },
    });

    client.current.activate();

    return () => {
      if (client.current) {
        client.current.deactivate();
      }
    };
  }, [brokerURL, topic]);

  const subscribe = () => {
    client.current?.subscribe(topic, (message) => {
      const chatMessage: ChatMessage = JSON.parse(message.body);
      onMessageReceived(chatMessage);
    });
  };

  const sendMessage = (destination: string, messageContent: ChatMessage) => {
    client.current?.publish({
      destination,
      body: JSON.stringify(messageContent),
    });
  };

  return { isConnected, sendMessage };
};

export default useStompClient;
