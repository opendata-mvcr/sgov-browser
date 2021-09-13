import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Box, styled } from "@material-ui/core";
import { useLocation } from "react-router-dom";

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

const searchRoutes = ["/term", "/disambiguation"];
const illustrationRoutes = ["/search", "/term", "/disambiguation"];

const Layout: React.FC = (props) => {
  const location = useLocation();
  const [showSearch, setShowSearch] = useState(false);
  const [showIllustration, setShowIllustration] = useState(false);
  useEffect(() => {
    setShowSearch(searchRoutes.includes(location.pathname));
    setShowIllustration(illustrationRoutes.includes(location.pathname));
  }, [location]);

  return (
    <FullSizedBox>
      <Header showSearch={showSearch} />
      <ContentBox>{props.children}</ContentBox>
      <Footer showImage={showIllustration} />
    </FullSizedBox>
  );
};

export default Layout;
