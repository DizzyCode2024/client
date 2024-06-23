import { ChatIcon, StarIcon } from "@chakra-ui/icons";
import { Box, Tooltip } from "@chakra-ui/react";

const Container = ({ children }: { children: React.ReactNode }) => (
  <Box
    width="100%"
    height="4rem"
    display="flex"
    justifyContent="space-between"
    alignItems="center"
    bg="gray.600"
    color="gray.100"
    boxShadow="base"
    p="6"
  >
    {children}
  </Box>
);

const MenuList = ["온라인", "모두", "대기중", "차단 목록", "친구 추가하기"];

const TopMenu = () => {
  return (
    <Container>
      <Box display="flex" alignItems="center">
        <Box
          color="white"
          textAlign="left"
          paddingLeft={2}
          paddingRight={7}
          fontSize="2xl"
          fontWeight="bold"
          borderRight="1px"
          borderRightColor="gray.500"
          borderRightWidth="1px"
        >
          <StarIcon marginRight={2} width="2rem" color="gray.200" />
          친구
        </Box>
        <Box display="flex" marginLeft={4}>
          {MenuList.map((menu, index) => (
            <Box
              as="button"
              key={index}
              display="flex"
              alignItems="center"
              marginRight={4}
              padding="0.5rem 1rem"
              borderRadius="md"
              fontSize="2xl"
              transition="all 0.2s ease-out"
              _hover={{ bg: "gray.500" }}
            >
              {menu}
            </Box>
          ))}
        </Box>
      </Box>
      <Tooltip label="새로운 그룹 메시지" bg="gray.900" fontSize="2xl">
        <Box as="button">
          <ChatIcon color="gray.300" _hover={{ color: "white" }} />
        </Box>
      </Tooltip>
    </Container>
  );
};

export default TopMenu;
