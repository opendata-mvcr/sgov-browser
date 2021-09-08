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

interface LayoutSettings {
  fullHeader?: boolean;
  fullFooter?: boolean;
}

const Layout: React.FC<LayoutSettings> = (props) => {
  return (
    <FullSizedBox>
      <Header showSearch={props.fullHeader} />
      <ContentBox>{props.children}</ContentBox>
      <Footer showImage={props.fullFooter} />
    </FullSizedBox>
  );
};

export default Layout;
