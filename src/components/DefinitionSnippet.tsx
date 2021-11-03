import React from "react";
import { SearchTerm } from "../api/WordsAPI";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const MAX_LINES = 2;

const useStyles = makeStyles((theme) => ({
  overflow: {
    position: "relative",
    maxHeight: `calc(${theme.typography.h4.lineHeight}*${theme.typography.h4.fontSize} * ${MAX_LINES})`,
    overflow: "hidden",
    paddingRight: "1.6rem" /* space for ellipsis */,
    "&::before": {
      position: "absolute",
      content: "'\\002026'!important",
      bottom: 0,
      right: 0,
    },
    "&::after": {
      content: "''!important",
      position: "absolute",
      right: 0,
      width: "1.8rem",
      height: "2.1rem",
      background: theme.palette.text.secondary,
    },
  },
}));

const DefinitionSnippet: React.FC<SearchTerm> = ({ definition }) => {
  const classes = useStyles();
  if (definition) {
    return (
      <Typography variant="h4" className={classes.overflow}>
        {definition}
      </Typography>
    );
  }

  return (
    <Box fontStyle="italic" color="text.disabled">
      <Typography variant="h4">Pojem nemá definici</Typography>
    </Box>
  );
};

export default DefinitionSnippet;
