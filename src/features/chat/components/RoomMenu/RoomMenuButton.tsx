import MenuItemWithIcon from "@/components/MenuItemWithIcon";
import { ChevronDownIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuList,
} from "@chakra-ui/react";
import { FaBell } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { MdPersonAddAlt1 } from "react-icons/md";
import { RiFileAddFill } from "react-icons/ri";
import { VscSignOut } from "react-icons/vsc";

const RoomMenuButton = ({ name }: { name: string }) => (
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
            {name}
          </Box>
        </MenuButton>
        <MenuList ml={3}>
          <MenuItemWithIcon text="친구 초대하기" icon={MdPersonAddAlt1} />
          <MenuItemWithIcon text="서버 설정" icon={IoMdSettings} />
          <MenuItemWithIcon text="카테고리 추가" icon={RiFileAddFill} />
          <MenuDivider />
          <MenuItemWithIcon text="알림 on/off" icon={FaBell} />
          <MenuDivider />
          <MenuItemWithIcon text="서버 나가기" icon={VscSignOut} isRed={true} />
        </MenuList>
      </>
    )}
  </Menu>
);

export default RoomMenuButton;
