import { Icon, MenuItem, Text } from "@chakra-ui/react";
import { IconType } from "react-icons";

const MenuItemWithIcon = ({
  text,
  icon,
  isRed = false,
}: {
  text: string;
  icon: IconType;
  isRed?: boolean;
}) => {
  return (
    <MenuItem
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      w="20rem"
      color={isRed ? "red.600" : "gray.100"}
      _hover={
        isRed ? { bg: "red.600", color: "gray.100" } : { bg: "purple.600" }
      }
      _focus={
        isRed ? { bg: "red.600", color: "gray.100" } : { bg: "purple.600" }
      }
    >
      <Text>{text}</Text>
      <Icon as={icon} boxSize={7} />
    </MenuItem>
  );
};

export default MenuItemWithIcon;
