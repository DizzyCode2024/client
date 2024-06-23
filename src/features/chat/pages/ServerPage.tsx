import styled from "styled-components";
import ChatSection from "../components/ChatSection/ChatSection";
import ServerList from "../components/ServerList/ServerList";
import ServerMenu from "../components/ServerMenu/ServerMenu";

const Container = styled.div`
  /* temporary */
  width: 100%;
  display: flex;
  background-color: ${({ theme }) => theme.colors.textDim};
`;

const ServerPage = () => {
  // const toast = useCustomToast();
  // toast({ title: "hello", status: "success" });

  return (
    <Container>
      <ServerList />
      <ServerMenu />
      <ChatSection />
    </Container>
  );
};

export default ServerPage;
