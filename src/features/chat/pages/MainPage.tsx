import { useCustomToast } from "@/hooks/useCustomToast";
import styled from "styled-components";
import ServerList from "../components/ServerList";
import DMList from "../components/DMList";
import FriendList from "../components/FriendList";

const Container = styled.div`
  /* temporary */
  width: 100%;
  display: flex;
  background-color: ${({ theme }) => theme.colors.textDim};
`;

const MainPage = () => {
  // const toast = useCustomToast();
  // toast({ title: "hello", status: "success" });

  return (
    <Container>
      <ServerList />
      <DMList />
      <FriendList />
    </Container>
  );
};

export default MainPage;
