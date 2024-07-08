import { Icon, MenuItem, Text } from '@chakra-ui/react';
import { IconType } from 'react-icons';

const MenuItemWithIcon = ({
  text,
  icon,
  colorScheme = 'gray',
  onClick,
}: {
  text: string;
  icon?: IconType;
  colorScheme?: string;
  onClick?: () => void;
}) => {
  return (
    <MenuItem
      onClick={onClick}
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
      w={'20rem'}
      color={`${colorScheme}.600`}
      _hover={{
        bg: `${colorScheme}.600`,
        color: 'white',
      }}
      _focus={{
        bg: `${colorScheme}.600`,
        color: 'white',
      }}
    >
      <Text>{text}</Text>
      {icon && <Icon as={icon} boxSize={7} />}
    </MenuItem>
  );
};

export default MenuItemWithIcon;
