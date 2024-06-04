import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      text: string;
      textDim: string;
      textDimmer: string;
      primary: string;
      secondary: string;
      tertiary: string;
      background: string;
      border: string;
    };
    spacing: {
      offset: string;
      gutter: string;
      padding: string;
      small: string;
    };
  }
}
