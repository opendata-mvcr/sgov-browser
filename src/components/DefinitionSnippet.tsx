import React from "react";
import { SearchTerm } from "../api/WordsAPI";
import { Box, styled, Typography } from "@mui/material";

const MAX_LINES = 2;

const Snippet = styled(Typography)(({ theme }) => ({
  "--fontsize": "1.5625rem",
  "@media (min-width: 600px)": {
    "--fontsize": "1.8219rem",
  },
  "@media (min-width: 900px)": {
    "--fontsize": "2.0243rem",
  },
  position: "relative",
  maxHeight: `calc(${theme.typography.h4.lineHeight} * var(--fontsize) * ${MAX_LINES})`,
  overflow: "hidden",
  paddingRight: "1.6rem" /* space for ellipsis */,
  "&::before": {
    position: "absolute",
    content: '"\\002026"',
    bottom: 0,
    right: 0,
  },
  "&::after": {
    content: '""',
    position: "absolute",
    right: 0,
    width: "1.8rem",
    height: "2.1rem",
    background: theme.palette.text.secondary,
  },
}));

const DefinitionSnippet: React.FC<SearchTerm> = ({ definition }) => {
  if (definition) {
    return <Snippet variant="h4">{definition}</Snippet>;
  }

  return (
    <Box fontStyle="italic" color="text.disabled">
      <Typography variant="h4">Pojem nemá definici</Typography>
    </Box>
  );
};

export default DefinitionSnippet;
