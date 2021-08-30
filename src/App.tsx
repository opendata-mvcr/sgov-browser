import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./app/theme";
import HeroSection from "./components/HeroSection";
import { CssBaseline } from "@material-ui/core";
import Layout from "./Layout";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <HeroSection />
        </Layout>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  );
};

export default App;
