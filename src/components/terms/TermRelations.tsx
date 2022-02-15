import React, { ReactElement } from "react";
import { Box, styled, Typography } from "@mui/material";
import { TermInterface } from "../../api/data/terms";
import { CurrentRelationTerm } from "./RelationItem";
import { calculateConnector } from "./Relations";
import RelationConnector, { TLine } from "./RelationConnector";
import useIsMobile from "../../hooks/useIsMobile";
import TermRelationsMobile from "./TermRelationsMobile";

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
    return (
      <Box display="flex" key={item.key}>
        <TermBox>
          {index === 0 && <CurrentRelationTerm data={currentTerm} />}
        </TermBox>
        <Box flex={1}>{calculateConnector(index, domains.length, false)}</Box>
        <TermBox>{item}</TermBox>
      </Box>
    );
  });

  const rangeRows = ranges.map((item, index) => {
    return (
      <Box display="flex" key={item.key}>
        <TermBox>{item}</TermBox>
        <Box flex={1}>{calculateConnector(index, ranges.length, true)}</Box>
        <TermBox>
          {index === 0 && <CurrentRelationTerm data={currentTerm} />}
        </TermBox>
      </Box>
    );
  });

  const mobileActive = useIsMobile();
  if (!mobileActive) {
    return (
      <Box mt={1}>
        {domains.length !== 0 && domainRows}
        {ranges.length !== 0 && rangeRows}
      </Box>
    );
  } else {
    return <TermRelationsMobile currentTerm={currentTerm} domains={domains} ranges={ranges}/>
  }
};


export default TermRelations;
