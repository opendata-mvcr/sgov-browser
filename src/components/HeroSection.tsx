import { Box, Container, Grid, styled, Typography } from "@mui/material";
import React from "react";
import { ReactComponent as Hero } from "../assets/hero.svg";
import SuggestedWords from "./SuggestedWords";
import SearchBar from "./SearchBar";

const HeroWrapper = styled(Grid)(({ theme }) => ({
  textAlign: "right",
  [theme.breakpoints.down("lg")]: {
    textAlign: "left",
  },
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

const HeroSection: React.FC = () => {
  return (
    <Box bgcolor="primary.main" py={3} style={{ flex: 1 }}>
      <Container component="section" maxWidth="lg">
        <Grid container justifyContent="center" alignItems="center" spacing={1}>
          <Grid item md={5} xs={10}>
            <Typography variant="h1" color="textSecondary" gutterBottom>
              Hledat význam není těžké.
            </Typography>
            <Typography variant="h2" color="textSecondary">
              Stačí vědět, kde hledat.
            </Typography>
          </Grid>
          <HeroWrapper item md={4}>
            <Hero
              style={{
                width: "80%",
                maxHeight: 330,
              }}
            />
          </HeroWrapper>
          <Grid item md={10} xs={12}>
            <SearchBar size="large" />
          </Grid>
          <Grid item md={10} xs={12}>
            <SuggestedWords />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HeroSection;
