import { DefaultTheme } from 'styled-components';
import { extendTheme } from '@chakra-ui/react';
import { palette } from '@/lib/constants/palette';
import { spacing } from '@/lib/constants/spacing';
import { menuTheme } from './menuTheme';
import { modalTheme } from './modalTheme';

const theme = {
  colors: {
    text: palette.neutral700_gray,
    textDim: palette.neutral600_gray,
    textDimmer: palette.neutral500_gray,
    textDark: palette.neutral400_gray,
  },
  spacing: {
    offset: spacing.offset,
    gutter: spacing.gutter,
    padding: spacing.padding,
    small: spacing.small,
  },
};

// styled-components 테마
const styledTheme: DefaultTheme = theme;

// Chakra UI 테마
const chakraTheme = extendTheme({
  colors: theme.colors,
  components: {
    Menu: menuTheme,
    Modal: modalTheme,
  },
});

export { styledTheme, chakraTheme };
