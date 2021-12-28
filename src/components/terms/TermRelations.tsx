import React, { ReactElement } from "react";
import { Box, styled } from "@mui/material";
import { TermInterface } from "../../api/data/terms";
import { CurrentRelationTerm } from "./RelationItem";
import { calculateConnector, calculateReverseConnector } from "./Relations";

export interface RelationsItemProps {
  currentTerm: TermInterface;
  domains: ReactElement[];
  ranges: ReactElement[];
}

const TermBox = styled(Box)(({ theme }) => ({
  flex: 3,
  minWidth: 165,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
}));

const TermRelations: React.FC<RelationsItemProps> = ({
  domains,
  currentTerm,
  ranges,
}) => {
  const domainRows = domains.map((item, index) => {
    if (index === 0) {
      return (
        <Box display="flex" key={item.key}>
          <TermBox>
            <CurrentRelationTerm data={currentTerm} />
          </TermBox>
          <Box flex={1}>{calculateConnector(index, domains.length)}</Box>
          <TermBox>{item}</TermBox>
        </Box>
      );
    } else {
      return (
        <Box display="flex" key={item.key}>
          <TermBox />
          <Box flex={1}>{calculateConnector(index, domains.length)}</Box>
          <TermBox>{item}</TermBox>
        </Box>
      );
    }
  });

  const rangeRows = ranges.map((item, index) => {
    if (index === 0) {
      return (
        <Box display="flex" key={item.key}>
          <TermBox>{item}</TermBox>
          <Box flex={1}>{calculateReverseConnector(index, ranges.length)}</Box>
          <TermBox>
            <CurrentRelationTerm data={currentTerm} />
          </TermBox>
        </Box>
      );
    } else {
      return (
        <Box display="flex" key={item.key}>
          <TermBox>{item}</TermBox>
          <Box flex={1}>{calculateReverseConnector(index, ranges.length)}</Box>
          <TermBox />
        </Box>
      );
    }
  });

  return (
    <Box mt={1}>
      {domains.length !== 0 && domainRows}
      {ranges.length !== 0 && rangeRows}
    </Box>
  );
};

export default TermRelations;
