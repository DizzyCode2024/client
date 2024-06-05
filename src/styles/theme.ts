import { DefaultTheme } from "styled-components";
import { palette } from "@/constants/palette";
import { spacing } from "@/constants/spacing";
import { extendTheme } from "@chakra-ui/react";

const theme = {
  colors: {
    text: palette.neutral700_gray,
    textDim: palette.neutral600_gray,
    textDimmer: palette.neutral500_gray,
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
});

export { styledTheme, chakraTheme };
