import { Box, Tooltip, keyframes } from "@chakra-ui/react";
import { StarIcon, SettingsIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";

const Container = ({ children }) => (
  <Box
    minWidth="23rem"
    height="5rem"
    bg="gray.800"
    display="flex"
    justifyContent="space-between"
    alignItems="center"
    mt="auto"
  >
    {children}
  </Box>
);
const UserBox = () => {
  const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;
  const MotionSettingsIcon = motion(SettingsIcon);

  return (
    <Container>
      <Box
        display="flex"
        alignItems="center"
        cursor="pointer"
        minWidth="13rem"
        height="4rem"
        transition="all 0.2s ease-in"
        borderRadius="3px"
        _hover={{ bg: "gray.700", color: "white" }}
      >
        <Box
          backgroundColor="teal.200"
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
        <Box ml={4} display="flex" flexDirection="column" alignItems="center">
          <Box color="gray.200" fontSize="2xl" fontWeight="bold" mt={1}>
            사용자
          </Box>
          <Box color="gray.400" fontSize="xl" mr="auto" mb={1}>
            온라인
          </Box>
        </Box>
      </Box>
      <Tooltip label="사용자 설정" fontSize="2xl" bg="gray.900">
        <Box
          mr={5}
          as="button"
          display="flex"
          alignItems="center"
          justifyContent="center"
          _hover={{ animation: `${spin} 1s linear infinite` }}
        >
          <MotionSettingsIcon color="gray.400" />
        </Box>
      </Tooltip>
    </Container>
  );
};

export default UserBox;
