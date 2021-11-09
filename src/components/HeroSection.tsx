import { Box, Container, Grid, Typography } from "@material-ui/core";
import React from "react";
import { ReactComponent as Hero } from "../assets/hero.svg";
import SuggestedWords from "./SuggestedWords";
import SearchBar from "./SearchBar";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  heroImage: {
    width: "80%",
    maxHeight: 330,
  },
  heroWrapper: {
    textAlign: "right",
    [theme.breakpoints.down("md")]: {
      textAlign: "left",
    },
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
}));

const HeroSection: React.FC = () => {
  const classes = useStyles();
  return (
    <Box bgcolor="primary.main" py={3} style={{ flex: 1 }}>
      <Container component="section" maxWidth="lg">
        <Grid container justifyContent="center" alignItems="center" spacing={1}>
          <Grid item md={5}>
            <Typography variant="h1" color="textSecondary" gutterBottom>
              Hledat význam
              <br /> není těžké.
            </Typography>
            <Typography variant="h2" color="textSecondary">
              Stačí vědět, kde hledat.
            </Typography>
          </Grid>
          <Grid item md={4} className={classes.heroWrapper}>
            <Hero className={classes.heroImage} />
          </Grid>
          <Grid item md={10} xs={12}>
            <SearchBar size="large" />
          </Grid>
          <Grid item md={10}>
            <SuggestedWords />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HeroSection;
