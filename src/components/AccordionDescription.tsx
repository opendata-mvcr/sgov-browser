import React from "react";
import { TermBase, useTerm } from "../api/TermAPI";
import { emptyTerm } from "./TermPage";
import { Box, CircularProgress, Typography } from "@material-ui/core";

const AccordionDescription: React.FC<TermBase> = (props) => {
  const { data = [], isLoading, isSuccess } = useTerm(props ?? emptyTerm);
  if (isLoading) {
    return (
      <Box flex={1} display="flex" alignItems="center">
        <CircularProgress />
        <Typography>Načítání definice</Typography>
      </Box>
    );
  }
  const description = data.definition?.cs
    ? data.definition.cs
    : "Pojem nemá definici";
  if (isSuccess) return <Typography>{description}</Typography>;

  return null;
};

export default AccordionDescription;
