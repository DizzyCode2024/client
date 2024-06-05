import { useCustomToast } from "@/hooks/useCustomToast";
import { Button } from "@chakra-ui/react";
import styled from "styled-components";

const Container = styled.div`
  /* temporary */
  width: 100%;
  background-color: ${({ theme }) => theme.colors.textDim};
`;

const MainPage = () => {
  const toast = useCustomToast();
  toast({ title: "hello", status: "success" });
  return (
    <Container>
      <Button color={"text"}>Button</Button>
      <h1>Chat</h1>
    </Container>
  );
};

export default MainPage;
