import React, { ReactElement } from "react";
import { Box, styled } from "@mui/material";
import { TermInterface } from "../../api/data/terms";
import { CurrentRelationTerm } from "./RelationItem";
import RelationConnector from "./RelationConnector";

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
    <Box>
      {domains.length !== 0 && domainRows}
      {ranges.length !== 0 && rangeRows}
    </Box>
  );
};

const calculateConnector = (index: number, size: number) => {
  if (size === 1) {
    return <RelationConnector type="straight" />;
  }
  if (size > 1 && index === 0) {
    return <RelationConnector type="tline" />;
  }
  if (size > 1 && index + 1 !== size) {
    return <RelationConnector type="hline" />;
  }
  if (size > 1 && index + 1 === size) {
    return <RelationConnector type="lline" />;
  }
  return <></>;
};

const calculateReverseConnector = (index: number, size: number) => {
  if (size === 1) {
    return <RelationConnector type="straight" />;
  }
  if (size > 1 && index === 0) {
    return <RelationConnector type="r_tline" />;
  }
  if (size > 1 && index + 1 !== size) {
    return <RelationConnector type="r_hline" />;
  }
  if (size > 1 && index + 1 === size) {
    return <RelationConnector type="r_lline" />;
  }
  return <></>;
};

export default TermRelations;
