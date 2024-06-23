import styled from "styled-components";
import DMList from "../components/DMList";
import FriendList from "../components/FriendList";
import ServerList from "../components/ServerList/ServerList";
import useStompClient from "../hooks/useStompClient";
import { ChatMessage } from "../types";
import { useState } from "react";

const Container = styled.div`
  /* temporary */
  width: 100%;
  display: flex;
  background-color: ${({ theme }) => theme.colors.textDim};
`;

const DMPage = () => {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const { isConnected, sendMessage } = useStompClient(
    "http://localhost:8080/ws/gs-guide-websocket",
    "/topic/greetings",
    (chatMessage) => {
      console.log(chatMessage);
      // setMessages((prevMessages) => [...prevMessages, chatMessage]);
    }
  );
  // const handleSendMessage = () => {
  //   const messageContent: ChatMessage = {
  //     sender: "UserA",
  //     content: message,
  //     type: "CHAT",
  //   };
  //   sendMessage("/app/chat.sendMessage", messageContent);
  //   setMessage("");
  // };

  return (
    <Container>
      <ServerList />
      <DMList />
      <FriendList />
    </Container>
  );
};

export default DMPage;
