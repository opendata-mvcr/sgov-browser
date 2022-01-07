import React from "react";
import { SearchTerm } from "../../api/WordsAPI";
import { Box, Typography } from "@mui/material";
import MaxLineText from "../MaxLineText";

const DefinitionSnippet: React.FC<SearchTerm> = ({ definition }) => {
  if (definition) {
    return (
      <MaxLineText maxlines={2} variant="h4">
        {definition}
      </MaxLineText>
    );
  }

  return (
    <Box fontStyle="italic" color="text.disabled">
      <Typography variant="h4">Pojem nemá definici</Typography>
    </Box>
  );
};

export default DefinitionSnippet;
