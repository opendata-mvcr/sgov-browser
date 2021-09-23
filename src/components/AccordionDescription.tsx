import React, { useEffect, useState } from "react";
import { TermBase, useTerm } from "../api/TermAPI";
import { emptyTerm } from "./TermPage";
import { Box, CircularProgress, Typography } from "@material-ui/core";

const AccordionDescription: React.FC<TermBase> = (props) => {
  const [description, setDescription] = useState<string>();
  const { data = [], isLoading, isSuccess } = useTerm(props ?? emptyTerm);

  useEffect(() => {
    if (isSuccess) {
      if (data.definition?.cs) {
        setDescription(data.definition.cs);
      } else {
        setDescription("Pojem nemá definici");
      }
    }
  }, [data, isSuccess]);

  if (isLoading)
    return (
      <Box flex={1} display="flex" alignItems="center">
        <CircularProgress />
        <Typography>Načítání definice</Typography>
      </Box>
    );

  if (isSuccess) return <Typography>{description}</Typography>;

  return null;
};

export default AccordionDescription;
