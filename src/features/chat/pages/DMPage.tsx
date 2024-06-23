import styled from "styled-components";
import DMList from "../components/DMList";
import FriendList from "../components/FriendList";

const Container = styled.div`
  /* temporary */
  width: 100%;
  display: flex;
  background-color: ${({ theme }) => theme.colors.textDim};
`;

const DMPage = () => {
  return (
    <Container>
      <DMList />
      <FriendList />
    </Container>
  );
};

export default DMPage;
