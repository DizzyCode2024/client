import { modalAnatomy as parts } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle({
  overlay: {
    bg: 'blackAlpha.600',
  },

  dialog: {
    borderRadius: 'md',
    bg: `gray.800`,
    color: 'white',
  },
  closeButton: {
    color: 'gray.400',
    m: '1rem',
  },
});

export const modalTheme = defineMultiStyleConfig({
  baseStyle,
});
