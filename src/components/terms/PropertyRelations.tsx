import React from "react";
import { Box, styled } from "@mui/material";
import { CurrentRelationTerm } from "./RelationItem";
import TermRelations, { RelationsItemProps } from "./TermRelations";
import { calculateConnector } from "./Relations";

const TermBox = styled(Box)(({ theme }) => ({
  flex: 3,
  minWidth: 165,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
}));

const PropertyRelations: React.FC<RelationsItemProps> = ({
  domains,
  ranges,
  currentTerm,
}) => {
  if (domains.length === 0 || ranges.length === 0)
    return (
      <TermRelations
        currentTerm={currentTerm}
        domains={ranges}
        ranges={domains}
      />
    );

  const firstRow =
    domains.length && ranges.length ? (
      <Box flex={1} display="flex" alignItems="center" justifyContent="center">
        <TermBox>{domains[0]}</TermBox>
        <Box flex={1} style={{ height: "100%" }}>
          {calculateConnector(0, domains.length, true)}
        </Box>
        <Box flex={1}>
          <CurrentRelationTerm data={currentTerm} />
        </Box>
        <Box flex={1} style={{ height: "100%" }}>
          {calculateConnector(0, ranges.length, false)}
        </Box>
        <TermBox>{ranges[0]}</TermBox>
      </Box>
    ) : null;

  const domainRows = domains.map((item, index) => {
    if (index === 0) {
      return null;
    } else {
      return (
        <Box display="flex" key={item.key}>
          <TermBox>{item}</TermBox>
          <Box flex={1}>{calculateConnector(index, domains.length, true)}</Box>
        </Box>
      );
    }
  });

  const rangeRows = ranges.map((item, index) => {
    if (index === 0) {
      return null;
    } else {
      return (
        <Box display="flex" key={item.key}>
          <Box flex={1}>{calculateConnector(index, ranges.length, false)}</Box>
          <TermBox>{item}</TermBox>
        </Box>
      );
    }
  });

  return (
    <Box mt={1}>
      <Box display="flex">{firstRow}</Box>
      {(domainRows.length > 1 || rangeRows.length > 1) && (
        <Box display="flex">
          <Box flex={4}>{domainRows}</Box>
          <Box flex={1} style={{ visibility: "hidden" }}>
            <CurrentRelationTerm data={currentTerm} />
          </Box>
          <Box flex={4}>{rangeRows}</Box>
        </Box>
      )}
    </Box>
  );
};

export default PropertyRelations;
