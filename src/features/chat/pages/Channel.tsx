import { useCustomToast } from "@/hooks/useCustomToast";
import styled from "styled-components";
import ServerList from "../components/ServerList";
import FriendList from "../components/FriendList";
import ServerMenu from "../components/ServerMenu";
import ChatSection from "../components/ChatSection";

const Container = styled.div`
  /* temporary */
  width: 100%;
  display: flex;
  background-color: ${({ theme }) => theme.colors.textDim};
`;

const ChannelPage = () => {
  const toast = useCustomToast();
  toast({ title: "hello", status: "success" });

  return (
    <Container>
      <ServerList />
      <ServerMenu />
      <ChatSection />
    </Container>
  );
};

export default ChannelPage;
