import { DefaultTheme } from "styled-components";
import { palette } from "../constants/palette";
import { spacing } from "../constants/spacing";

const theme: DefaultTheme = {
  colors: {
    text: palette.neutral700_gray,
    textDim: palette.neutral600_gray,
    textDimmer: palette.neutral500_gray,
    primary: "#0038FF",
    secondary: "#D0191C",
    tertiary: "#4285F4",
    background: "#F2F2F2",
    border: "#949496",
  },
  spacing: {
    offset: spacing.offset,
    gutter: spacing.gutter,
    padding: spacing.padding,
    small: spacing.small,
  },
};

export { theme };
