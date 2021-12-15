import React from "react";
import { Box, Typography } from "@mui/material";
import { TermInterface, TermRelationsInterface } from "../../api/data/terms";
import { CurrentRelationTerm, RelationTerm } from "./RelationTerm";

interface PropertyRelationsProps {
  relations: TermRelationsInterface[];
  currentTerm: TermInterface;
}

const PropertyRelations: React.FC<PropertyRelationsProps> = ({
  relations,
  currentTerm,
}) => {
  const ranges = relations[0].range.map((item) => {
    return <RelationTerm data={item} />;
  });
  const domains = relations[0].domain.map((item) => {
    return <RelationTerm data={item} />;
  });
//TODO: Relations issue: Pass the object in some better fashion
  return (
    <Box display="flex">
      <Box flex={1}>{domains}</Box>
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
      <Box flex={1}>{ranges}</Box>
    </Box>
  );
};

export default PropertyRelations;
