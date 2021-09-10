import React from "react";
import { Box, Container, Link, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link as RouterLink } from "react-router-dom";

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
  const words = ["Budova", "Bytový dům", "Stavba", "Koridor"];

  return (
    <Container>
      <Box className={classes.wrapper}>
        <Typography variant="h6" className={classes.item} color="textSecondary">
          Navrhovaná slova:
        </Typography>

        {words.map((word) => (
          <Link
            component={RouterLink}
            to={`/search?label=${word}`}
            key={word}
            className={classes.item}
            color="textSecondary"
            underline="always"
            variant="h6"
          >
            {word}
          </Link>
        ))}
      </Box>
    </Container>
  );
};

export default SuggestedWords;
