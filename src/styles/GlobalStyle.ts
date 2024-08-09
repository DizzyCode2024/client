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


::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background: #718096; 
    border-radius: 15px; 
    border: 1px solid #4A5568;
    background-clip: padding-box;
  }
  ::-webkit-scrollbar-track {
    background: none;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: rgba(45, 55, 72, 0.7); 
  }
`;

export default GlobalStyle;
