import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Box, styled } from "@mui/material";
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

const nonSearchRoutes = ["/", "/search"];
const nonIllustrationRoutes = ["/"];

const Layout: React.FC = (props) => {
  const location = useLocation();
  const [showSearch, setShowSearch] = useState(false);
  const [showIllustration, setShowIllustration] = useState(false);
  useEffect(() => {
    setShowSearch(!nonSearchRoutes.includes(location.pathname));
    setShowIllustration(!nonIllustrationRoutes.includes(location.pathname));
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
