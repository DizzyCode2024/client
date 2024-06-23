import useRoomStore from "@/stores/useRoomStore";
import { BASE_URL } from "@/utils/config";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { getRooms } from "../api/chatApi";
import DMList from "../components/DMList";
import FriendList from "../components/FriendList";
import ServerList from "../components/ServerList/ServerList";
import useStompClient from "../hooks/useStompClient";
import { ChatMessage, IRoom } from "../types";

const Container = styled.div`
  /* temporary */
  width: 100%;
  display: flex;
  background-color: ${({ theme }) => theme.colors.textDim};
`;

const DMPage = () => {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  // websocket connection
  const { isConnected, sendMessage } = useStompClient(
    `${BASE_URL}/ws/gs-guide-websocket`,
    "/topic/greetings",
    (chatMessage) => {
      console.log(chatMessage);
      // setMessages((prevMessages) => [...prevMessages, chatMessage]);
    }
  );

  // get rooms
  const setRooms = useRoomStore((state) => state.setRooms);
  const { data: rooms } = useQuery<IRoom[], Error>({
    queryKey: ["rooms"],
    queryFn: getRooms,
  });
  useEffect(() => {
    if (rooms) {
      setRooms(rooms);
    }
  }, [rooms]);

  return (
    <Container>
      <ServerList />
      <DMList />
      <FriendList />
    </Container>
  );
};

export default DMPage;
