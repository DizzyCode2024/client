import { menuAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(menuAnatomy.keys);

// define the base component styles
const baseStyle = definePartsStyle({
  // define the part you're going to style
  //   button: {
  //     // this will style the MenuButton component
  //     fontWeight: "medium",
  //     bg: "teal.500",
  //     color: "gray.200",
  //     _hover: {
  //       bg: "teal.600",
  //       color: "white",
  //     },
  //   },
  list: {
    // this will style the MenuList component
    py: '4',
    px: '2',
    borderRadius: 'xl',
    border: 'none',
    bg: 'gray.900',
    fontSize: 'sm',
  },
  item: {
    // this will style the MenuItem and MenuItemOption components
    color: 'gray.100',
    borderRadius: 'md',
    bg: 'transparent',
    fontWeight: 'bold',
    py: '1',
    _hover: {
      bg: 'purple.600',
    },
    _focus: {
      bg: 'purple.600',
    },
  },
  groupTitle: {
    // this will style the text defined by the title prop
    // in the MenuGroup and MenuOptionGroup components
    textTransform: 'uppercase',
    color: 'white',
    textAlign: 'center',
    letterSpacing: 'wider',
    opacity: '0.7',
  },
  command: {
    // this will style the text defined by the command
    // prop in the MenuItem and MenuItemOption components
    // opacity: "0.8",
    // fontFamily: "mono",
    // fontSize: "sm",
    // letterSpacing: "tighter",
    // pl: "4",
  },
  divider: {
    // this will style the MenuDivider component
    my: '2',
    mx: '1',
    borderColor: 'gray.500',
  },
});
// export the base styles in the component theme
export const menuTheme = defineMultiStyleConfig({ baseStyle });
