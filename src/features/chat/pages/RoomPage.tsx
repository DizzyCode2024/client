import styled from 'styled-components';
import ChatSection from '../components/ChatSection/ChatSection';
import RoomMenu from '../components/RoomMenu/RoomMenu';

const Container = styled.div`
  /* temporary */
  width: 100%;
  display: flex;
  background-color: ${({ theme }) => theme.colors.textDim};
`;

const RoomPage = () => {
  // const toast = useCustomToast();
  // toast({ title: "hello", status: "success" });

  return (
    <Container>
      <RoomMenu />
      <ChatSection />
    </Container>
  );
};

export default RoomPage;