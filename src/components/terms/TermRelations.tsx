import React, { ReactElement } from "react";
import {Box, Typography} from "@mui/material";
import { TermInterface } from "../../api/data/terms";
import { CurrentRelationTerm } from "./RelationTerm";
import RelationConnector from "./RelationConnector";

export interface RelationsItemProps {
  currentTerm: TermInterface;
  domains: ReactElement[];
  ranges: ReactElement[];
}

const TermRelations: React.FC<RelationsItemProps> = ({
  domains,
  currentTerm,
  ranges,
}) => {
  
  return (
    <Box>
      {domains.length !== 0 && (
        <Box display="flex">
          <Box flex={2}>
            <CurrentRelationTerm data={currentTerm} />
          </Box>
          <Box flex={2}>{domains}</Box>
        </Box>
      )}
      {ranges.length !== 0 && (
        <Box display="flex">
          <Box flex={2}>{ranges}</Box>
          <Box flex={2}>
            <CurrentRelationTerm data={currentTerm} />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default TermRelations;
