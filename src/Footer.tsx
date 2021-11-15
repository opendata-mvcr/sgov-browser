import React from "react";
import { Box, Container, Typography } from "@mui/material";
import opzLogo from "./assets/opz_logo.svg";
import { ReactComponent as FooterImage } from "./assets/footer_image.svg";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      display: "block",
    },
  },
  illustration: {
    position: "absolute",
    bottom: "-16px",
    right: "60px",
    maxHeight: 115,
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

interface FooterProps {
  showImage?: boolean;
}

const Footer: React.FC<FooterProps> = (props) => {
  const classes = useStyles();

  return (
    <Box>
      {props.showImage && (
        <Container>
          <Box style={{ position: "relative", marginTop: 100 }}>
            <FooterImage className={classes.illustration} />
          </Box>
        </Container>
      )}
      <Box bgcolor="primary.main" py={1}>
        <Container maxWidth="lg">
          <Box className={classes.wrapper}>
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
