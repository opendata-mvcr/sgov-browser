import React from "react";
import { Box, Typography } from "@material-ui/core";

const messageHelper = (length: number) => {
  if (length === 0) return `Nalezeno ${length} výsledků`;
  else if (length === 1) return `Nalezen ${length} výsledek`;
  else if (length <= 4) return `Nalezeny ${length} výsledky`;
  else return `Nalezeno ${length} výsledků`;
};

interface NumberOfResultsProps {
  amount: number;
}
const NumberOfResults: React.FC<NumberOfResultsProps> = (props) => {
  return (
    <Box pl={6} color="text.disabled" fontStyle="italic">
      <Typography variant="h6">{messageHelper(props.amount)}</Typography>
    </Box>
  );
};

export default NumberOfResults;
