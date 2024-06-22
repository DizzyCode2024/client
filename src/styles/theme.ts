import { DefaultTheme } from "styled-components";
import { palette } from "@/constants/palette";
import { spacing } from "@/constants/spacing";
import { extendTheme } from "@chakra-ui/react";
import { menuTheme } from "./menuTheme";

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
  },
});

export { styledTheme, chakraTheme };
