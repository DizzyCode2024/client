import styled from "styled-components";
import { AddIcon } from "@chakra-ui/icons";
import { Stack, Tooltip, Box, Divider } from "@chakra-ui/react";

const Container = ({ children }) => (
  <Box minWidth="7rem" height="100vh" bg="gray.800">
    {children}
  </Box>
);

const ServerButton = styled.button`
  margin: 0.5rem auto;
  height: 5rem;
  width: 5rem;
  border-radius: 50%;
  transition: all 0.3s ease-in-out;
  background-color: white;
  font-size: 1rem;
  &:hover {
    background-color: #4fd1c5;
    border-radius: 30%;
    color: white;
  }
`;

const DmButton = styled.button`
  margin: 0.5rem auto;
  height: 5rem;
  width: 5rem;
  border-radius: 30%;
  transition: all 0.3s ease-in-out;
  background-color: white;
  &:hover {
    background-color: #4fd1c5;
    color: white;
  }
`;

const TooltipButton = ({ label, children }) => (
  <Tooltip
    label={label}
    fontSize="2xl"
    placement="right"
    backgroundColor="gray.900"
  >
    {children}
  </Tooltip>
);

const ServerList = () => {
  return (
    <Container>
      <Stack
        display="flex"
        justifyContent="center"
        alignItems="center"
        marginTop={2}
      >
        <TooltipButton label="다이렉트 메시지">
          <DmButton>DM</DmButton>
        </TooltipButton>
        <Divider borderColor="gray.500" w="3rem" />
        <TooltipButton label="서버1">
          <ServerButton>서버1</ServerButton>
        </TooltipButton>
        <TooltipButton label="서버2">
          <ServerButton>서버2</ServerButton>
        </TooltipButton>
        <TooltipButton label="서버 추가하기">
          <ServerButton>
            <AddIcon w={6} h={6} paddingBottom={1} />
          </ServerButton>
        </TooltipButton>
      </Stack>
    </Container>
  );
};

export default ServerList;
