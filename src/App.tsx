import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from 'styled-components';
import { ChakraProvider } from '@chakra-ui/react';
import { useEffect } from 'react';
import GlobalStyle from '@/styles/GlobalStyle';
import { chakraTheme, styledTheme } from '@/styles/theme';
import { initializeAuthState } from '@/lib/api';
import Router from './Router';

const queryClient = new QueryClient();

function App() {
  useEffect(() => {
    initializeAuthState();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={chakraTheme}>
        <ThemeProvider theme={styledTheme}>
          <GlobalStyle />
          <Router />
        </ThemeProvider>
      </ChakraProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
