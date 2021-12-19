import React from "react";
import { Box } from "@mui/material";
import { TermInterface, TermRelationsInterface } from "../../api/data/terms";
import { CurrentRelationTerm, RelationTerm } from "./RelationTerm";

interface TermRelationsProps {
  relations: TermRelationsInterface[];
  currentTerm: TermInterface;
}

const TermRelations: React.FC<TermRelationsProps> = ({
  relations,
  currentTerm,
}) => {
  const ranges = relations[0].range.map((item) => {
    return <RelationTerm data={item} />;
  });
  const domains = relations[0].domain.map((item) => {
    return <RelationTerm data={item} />;
  });
  return (
    <Box>
      {domains.length !== 0 && (
        <Box display="flex">
          <Box flex={1}>
            <CurrentRelationTerm
              data={currentTerm}
            />
          </Box>
          <Box flex={1}>{domains}</Box>
        </Box>
      )}
      {ranges.length !== 0 && (
        <Box display="flex">
          <Box flex={1}>{ranges}</Box>
          <Box flex={1}>
            <CurrentRelationTerm
              data={currentTerm}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default TermRelations;
