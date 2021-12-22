import React from "react";
import { Box } from "@mui/material";
import { CurrentRelationTerm } from "./RelationItem";
import { RelationsItemProps } from "./TermRelations";

const PropertyRelations: React.FC<RelationsItemProps> = ({
  domains,
  ranges,
  currentTerm,
}) => {
  return (
    <Box display="flex">
      <Box flex={1}>{domains}</Box>
      <Box flex={1}>
        <CurrentRelationTerm data={currentTerm} />
      </Box>
      <Box flex={1}>{ranges}</Box>
    </Box>
  );
};

export default PropertyRelations;
