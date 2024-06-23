import { Route, Routes } from "react-router-dom";
import DMPage from "./features/chat/pages/DMPage";
import ServerPage from "./features/chat/pages/ServerPage";
import ServerList from "./features/chat/components/ServerList/ServerList";
import { Box } from "@chakra-ui/react";
import useRoomStore from "./stores/useRoomStore";
import { ChatMessage, IRoom } from "./features/chat/types";
import { useQuery } from "@tanstack/react-query";
import { getRooms } from "./features/chat/api/chatApi";
import { useEffect } from "react";
import { BASE_URL } from "./utils/config";
import { StompSubscription } from "@stomp/stompjs";
import useStompClient from "./features/chat/hooks/useStompClient";

const LoggedRouter = () => {
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
    <Box display={"flex"}>
      <ServerList />
      <Routes>
        <Route path="/main" element={<DMPage />} />
        <Route path="/channels/:id" element={<ServerPage />} />
      </Routes>
    </Box>
  );
};

export default LoggedRouter;
