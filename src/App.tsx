import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./app/theme";
import { CssBaseline, responsiveFontSizes } from "@material-ui/core";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Router from "./Router";

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
      <ThemeProvider theme={responsiveTheme}>
        <CssBaseline />
        <Router />
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  );
};

export default App;
