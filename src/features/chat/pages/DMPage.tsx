import styled from "styled-components";
import DMList from "../components/DMList";
import FriendList from "../components/FriendList";
import ServerList from "../components/ServerList/ServerList";

const Container = styled.div`
  /* temporary */
  width: 100%;
  display: flex;
  background-color: ${({ theme }) => theme.colors.textDim};
`;

const DMPage = () => {
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

export default DMPage;
