import React from "react";
import { ThemeProvider, Theme, StyledEngineProvider } from "@mui/material/styles";
import theme from "./app/theme";
import { CssBaseline, responsiveFontSizes } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Router from "./Router";


declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

const App: React.FC = () => {
  const responsiveTheme = responsiveFontSizes(theme);
  return (
    <QueryClientProvider client={queryClient}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={responsiveTheme}>
          <CssBaseline />
          <Router />
        </ThemeProvider>
      </StyledEngineProvider>
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  );
};

export default App;
