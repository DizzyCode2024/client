import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}

  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Arial, Helvetica, sans-serif;
    overflow-x: hidden;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
`;

export default GlobalStyle;
