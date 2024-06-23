import useRoomStore from "@/stores/useRoomStore";
import { BASE_URL } from "@/utils/config";
import { StompSubscription } from "@stomp/stompjs";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
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
  // get rooms
  const setRooms = useRoomStore((state) => state.setRooms);
  const {
    data: rooms,
    isLoading,
    isError,
    error,
  } = useQuery<IRoom[], Error>({
    queryKey: ["rooms"],
    queryFn: getRooms,
  });
  useEffect(() => {
    if (rooms) {
      setRooms(rooms);
    }
  }, [rooms]);

  // 웹소켓 연결, rooms 구독
  const { isConnected, subscribe, unsubscribe } = useStompClient(
    `${BASE_URL}/ws/gs-guide-websocket`
  );
  useEffect(() => {
    if (rooms && isConnected) {
      const subscriptions: StompSubscription[] = [];

      rooms.forEach((room) => {
        const subscription = subscribe(
          `/topic/rooms/${room.roomId}`,
          (message) => {
            const chatMessage: ChatMessage = JSON.parse(message.body);
            console.log(
              `Received message in room ${room.roomId}:`,
              chatMessage
            );
            // 추가 설정
          }
        );
        if (subscription) subscriptions.push(subscription);
      });

      return () => {
        subscriptions.forEach((subscription) => unsubscribe(subscription));
      };
    }
  }, [rooms, isConnected, subscribe, unsubscribe]);

  return (
    <Container>
      <ServerList />
      <DMList />
      <FriendList />
    </Container>
  );
};

export default DMPage;
