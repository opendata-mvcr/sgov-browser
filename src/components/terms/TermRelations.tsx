import React from "react";
import { Box, Typography } from "@mui/material";
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
    //TODO: Relations issue: pass the object in better fashion
    //TODO: Relations issue: When domains or ranges are empty, do not show them
  return (
    <Box>
      <Box display="flex">
        <Box flex={1}>
          <CurrentRelationTerm
            data={{
              $id: currentTerm.$id,
              label: currentTerm.label,
              $type: currentTerm.$type,
              vocabulary: currentTerm.vocabulary.$id,
            }}
          />
        </Box>
        <Box flex={1}>{domains}</Box>
      </Box>
      <Box display="flex">
        <Box flex={1}>{ranges}</Box>
        <Box flex={1}>
          <CurrentRelationTerm
            data={{
              $id: currentTerm.$id,
              label: currentTerm.label,
              $type: currentTerm.$type,
              vocabulary: currentTerm.vocabulary.$id,
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default TermRelations;
