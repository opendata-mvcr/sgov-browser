import React from "react";
import { Box, Container, Typography } from "@material-ui/core";
import opzLogo from "./assets/opz_logo.svg";
import { ReactComponent as FooterImage } from "./assets/footer_image.svg";

interface FooterProps {
  showImage?: boolean;
}

const Footer: React.FC<FooterProps> = (props) => {
  return (
    <Box>
      {props.showImage && (
        <Container>
          <Box style={{ position: "relative" }}>
            <FooterImage
              style={{
                position: "absolute",
                bottom: "-20px",
                right: "0px",
                maxHeight: 270,
              }}
            />
          </Box>
        </Container>
      )}
      <Box bgcolor="primary.main" py={1}>
        <Container maxWidth="lg">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="body2" color="textSecondary">
              Tato aplikace je udržována v rámci projektu
              <br />
              OPZ č. CZ.03.4.74/0.0/0.0/15_025/0013983.
            </Typography>
            <img src={opzLogo} alt="OPZ" height={50} />
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;
