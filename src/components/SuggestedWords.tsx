import React from "react";
import { Box, Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import RouteLink from "./RouteLink";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: theme.spacing(3),
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  item: {
    marginRight: theme.spacing(3),
  },
}));

const SuggestedWords: React.FC = () => {
  const classes = useStyles();

  //Only for development purposes, need to discuss how to fetch this personalized data
  const words = ["Agenda", "Budova", "Vozidlo", "Závada"];

  return (
    <Container>
      <Box className={classes.wrapper}>
        <Typography variant="h6" className={classes.item} color="textSecondary">
          Navrhovaná slova:
        </Typography>

        {words.map((word) => (
          <RouteLink
            key={word}
            to={`/search?label=${word}`}
            className={classes.item}
            color="textSecondary"
            variant="h6"
          >
            {word}
          </RouteLink>
        ))}
      </Box>
    </Container>
  );
};

export default SuggestedWords;
