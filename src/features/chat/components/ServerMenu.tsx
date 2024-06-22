import MenuItemWithIcon from "@/components/MenuItemWithIcon";
import CustomTooltip from "@/components/Tooltip";
import {
  ChatIcon,
  ChevronDownIcon,
  CloseIcon,
  SmallAddIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { FaBell } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { MdPersonAddAlt1 } from "react-icons/md";
import { RiFileAddFill } from "react-icons/ri";
import { VscSignOut } from "react-icons/vsc";
import UserBox from "./UserBox";

const Container = ({ children }: { children: React.ReactNode }) => (
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
const ServerMenu = () => {
  return (
    <Container>
      <Menu>
        {({ isOpen }) => (
          <>
            <MenuButton
              isActive={isOpen}
              as={Button}
              rightIcon={isOpen ? <CloseIcon /> : <ChevronDownIcon />}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              h="4rem"
              w="23rem"
              color="gray.200"
              textAlign="left"
              pl={2}
              fontSize="2xl"
              transition="all 0.2s ease-in"
              boxShadow="base"
              bg="transparent"
              _hover={{ bg: "gray.600", color: "white" }}
              _expanded={{ bg: "gray.600", color: "white" }}
            >
              <Box ml={3} fontWeight="bold">
                서버 1
              </Box>
            </MenuButton>
            <MenuList ml={3}>
              <MenuItemWithIcon text="친구 초대하기" icon={MdPersonAddAlt1} />
              <MenuItemWithIcon text="서버 설정" icon={IoMdSettings} />
              <MenuItemWithIcon text="카테고리 추가" icon={RiFileAddFill} />
              <MenuDivider />
              <MenuItemWithIcon text="알림 on/off" icon={FaBell} />
              <MenuDivider />
              <MenuItemWithIcon
                text="서버 나가기"
                icon={VscSignOut}
                isRed={true}
              />
            </MenuList>
          </>
        )}
      </Menu>

      <Box
        color="gray.400"
        fontSize="xl"
        fontWeight="bold"
        margin="10px"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box as="button" _hover={{ color: "gray.100" }}>
          <ChevronDownIcon mr={1} />
          채팅 채널
        </Box>
        <CustomTooltip label="채널 만들기" placement="top">
          <SmallAddIcon
            _hover={{ bg: "gray.600", color: "white", cursor: "pointer" }}
          />
        </CustomTooltip>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        width="21rem"
        height="4rem"
        marginLeft={2}
        color="gray.300"
        borderRadius="3px"
        transition="all 0.2s ease-in"
        _hover={{ bg: "gray.600", color: "white" }}
        cursor="pointer"
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          marginLeft={2}
          width="3rem"
          height="3rem"
        >
          <ChatIcon width="2rem" />
        </Box>
        <Text>일반채팅 1</Text>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        width="21rem"
        height="4rem"
        marginLeft={2}
        color="gray.300"
        borderRadius="3px"
        transition="all 0.2s ease-in"
        _hover={{ bg: "gray.600", color: "white" }}
        cursor="pointer"
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          marginLeft={2}
          width="3rem"
          height="3rem"
        >
          <ChatIcon width="2rem" />
        </Box>
        <Text>일반채팅 2</Text>
      </Box>
      <UserBox />
    </Container>
  );
};

export default ServerMenu;
