import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./app/theme";
import HeroSection from "./components/HeroSection";
import { CssBaseline } from "@material-ui/core";
import Layout from "./Layout";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>
        <HeroSection />
      </Layout>
    </ThemeProvider>
  );
};

export default App;
