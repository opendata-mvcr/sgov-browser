import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Box, styled } from "@material-ui/core";

const FullSizedBox = styled(Box)({
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
});

const ContentBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
});

const Layout: React.FC = ({ children }) => {
  return (
    <FullSizedBox>
      <Header />
      <ContentBox>{children}</ContentBox>
      <Footer />
    </FullSizedBox>
  );
};

export default Layout;
