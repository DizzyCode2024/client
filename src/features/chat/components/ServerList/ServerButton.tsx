import CustomTooltip from "@/components/Tooltip";
import useRoomStore from "@/stores/useRoomStore";
import { handleRightClick } from "@/utils/handleRightClick";
import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Indicator from "./Indicator";
import MenuItemWithIcon from "@/components/MenuItemWithIcon";

const ServerButton = ({
  label,
  id,
  thumbnail,
}: {
  label: string;
  id: number;
  thumbnail: JSX.Element;
}) => {
  const navigate = useNavigate();
  const isSelected = useRoomStore((state) => state.currentRoomId === id);
  const setCurrentServer = useRoomStore((state) => state.setCurrentRoom);

  const handleClick = () => {
    setCurrentServer(id);
    navigate(`/chat/channels/${id}`);
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box
      w="100%"
      display={"flex"}
      justifyContent={"center"}
      position={"relative"}
      onContextMenu={(e) => handleRightClick(e, onOpen)}
    >
      {isSelected && <Indicator />}

      <CustomTooltip label={label} placement="right">
        <Button
          onClick={handleClick}
          m={"0.5rem auto"}
          h="5rem"
          w="5rem"
          borderRadius="50%"
          transition="all 0.3s ease-in-out"
          bg={"gray.700"}
          color="white"
          fontSize="1rem"
          _hover={{
            bg: "purple.600",
            borderRadius: "30%",
            color: "white",
          }}
        >
          {thumbnail}
        </Button>
      </CustomTooltip>

      <Menu isOpen={isOpen} onClose={onClose}>
        <MenuButton as={Box} style={{}} />
        <MenuList mt="-5rem" ml="1rem">
          <MenuItemWithIcon onClick={() => {}} text="방 삭제" isRed />
        </MenuList>
      </Menu>
    </Box>
  );
};

export default ServerButton;
