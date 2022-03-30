import React, { useEffect, useState } from "react";
import { Box, Button, styled } from "@mui/material";
import KeyboardArrowUpSharpIcon from "@mui/icons-material/KeyboardArrowUpSharp";

const ScrollButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "isVisible",
})<{ isVisible?: boolean }>(({ theme, isVisible }) => ({
  position: "fixed",
  bottom: 20,
  right: 20,
  justifyContent: "center",
  alignItems: "center",
  maxWidth: 50,
  minWidth: 30,
  transitionProperty: "opacity",
  opacity: isVisible ? 100 : 0,
  transition: "0.3s ease",
  visibility: isVisible ? "visible" : "hidden",
}));

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    setIsVisible(window.scrollY > 600);
  };

  const handleScrollUp = () => {
    window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
  };

  return (
    <ScrollButton
      isVisible={isVisible}
      onClick={handleScrollUp}
      variant="outlined"
      color="secondary"
    >
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <KeyboardArrowUpSharpIcon
          style={{ display: "block", minWidth: 40, minHeight: 40 }}
        />
      </Box>
    </ScrollButton>
  );
};

export default ScrollToTopButton;
