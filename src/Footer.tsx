import React from "react";
import { Box, Container, Typography } from "@material-ui/core";
import opzLogo from "./assets/opz_logo.svg";

const Footer: React.FC = () => {
  return (
    <Box bgcolor="primary.main" py={1}>
      <Container maxWidth="lg">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="body2">
            Tato aplikace je udržována v rámci projektu
            <br />
            OPZ č. CZ.03.4.74/0.0/0.0/15_025/0013983.
          </Typography>
          <img src={opzLogo} alt="OPZ" height={50} />
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
