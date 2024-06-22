import { Box, Stack, Text, Tooltip } from "@chakra-ui/react";
import { SmallAddIcon, StarIcon } from "@chakra-ui/icons";
import UserBox from "./UserBox";

const Container = ({ children }) => (
  <Box
    minWidth="23rem"
    height="100vh"
    bg="gray.700"
    display="flex"
    flexDirection="column"
  >
    {children}
  </Box>
);
const DMList = () => {
  return (
    <Container>
      <Stack
        display="flex"
        justifyContent="center"
        alignItems="center"
        marginTop={2}
      >
        <Box
          as="button"
          bg="gray.800"
          width="21rem"
          height="2.5rem"
          marginTop="0.5rem"
          color="gray.400"
          textAlign="left"
          paddingLeft={2}
          fontSize="2xl"
          borderRadius="3px"
          transition="all 0.2s ease-in"
          _hover={{ bg: "gray.900", color: "white" }}
        >
          대화 찾기 또는 시작하기
        </Box>
        <Box
          as="button"
          bg="gray.800"
          display="flex"
          alignItems="center"
          width="21rem"
          height="4rem"
          marginTop="0.5rem"
          color="gray.400"
          textAlign="left"
          paddingLeft={2}
          fontSize="2xl"
          borderRadius="3px"
          transition="all 0.2s ease-in"
          _hover={{ bg: "gray.500", color: "white" }}
        >
          <StarIcon marginRight={2} width="2rem" />
          친구
        </Box>
      </Stack>
      <Box
        color="gray.400"
        fontSize="xl"
        fontWeight="bold"
        margin="10px"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        다이렉트 메세지
        <Tooltip
          label="DM 생성"
          fontSize="2xl"
          placement="top"
          backgroundColor="gray.900"
        >
          <SmallAddIcon
            _hover={{ bg: "gray.600", color: "white", cursor: "pointer" }}
          />
        </Tooltip>
      </Box>
      <Box
        as="button"
        display="flex"
        alignItems="center"
        width="21rem"
        height="4rem"
        marginLeft={4}
        color="gray.300"
        borderRadius="3px"
        transition="all 0.2s ease-in"
        _hover={{ bg: "gray.600", color: "white" }}
      >
        <Box
          backgroundColor="teal.500"
          display="flex"
          justifyContent="center"
          alignItems="center"
          marginLeft={2}
          width="3rem"
          height="3rem"
          borderRadius="50%"
        >
          <StarIcon color="white" width="2rem" />
        </Box>
        <Text marginLeft="1rem">하루단백바</Text>
      </Box>
      <UserBox />
    </Container>
  );
};

export default DMList;
