import styled from "styled-components";
import { Box } from "@chakra-ui/react";

const Container = ({ children }) => (
  <Box width="100%" height="100vh" bg="gray.600">
    {children}
  </Box>
);
const FriendList = () => {
  return <Container>FriendList</Container>;
};

export default FriendList;
