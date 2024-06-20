import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      text: string;
      textDim: string;
      textDimmer: string;
      textDark: string;
    };
    spacing: {
      offset: string;
      gutter: string;
      padding: string;
      small: string;
    };
  }
}
