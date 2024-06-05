import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Router from "./Router";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "@/styles/GlobalStyle";
import { chakraTheme, styledTheme } from "@/styles/theme";
import { ChakraProvider } from "@chakra-ui/react";
const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={chakraTheme}>
          <ThemeProvider theme={styledTheme}>
            <GlobalStyle />
            <Router />
          </ThemeProvider>
        </ChakraProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default App;
