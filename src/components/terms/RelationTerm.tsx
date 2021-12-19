import React from "react";
import { Box, Paper, styled, Typography } from "@mui/material";
import { RelationTermResult } from "../../api/TermAPI";
import RouteLink from "../RouteLink";
import { generateTermRouteFromIris } from "../../utils/Utils";

//TODO: Relations issue: Solve passing parameters to styled

const TermBox = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  marginBottom: -1,
  minHeight: 56,
  display: "flex",
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(7),
  alignItems: "center",
  paddingTop: 12,
  paddingBottom: 12,
}));

const CurrentTermBox = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  marginBottom: -1,
  minHeight: 56,
  display: "flex",
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(7),
  alignItems: "center",
  paddingTop: 12,
  paddingBottom: 12,
}));

interface RelationTermProps {
  data: RelationTermResult;
}

export const RelationTerm: React.FC<RelationTermProps> = ({ data }) => {
  const routeProps = generateTermRouteFromIris(data.$id, data.vocabulary.$id);
  return (
    <Box
      bgcolor="primary.main"
      style={{
        border: "1px solid rgba(0, 0, 0, .125)",
        boxShadow: "none",
      }}
    >
      <TermBox square elevation={0}>
        <RouteLink to={routeProps} variant="h6" color="textSecondary">
          {data.label}
        </RouteLink>
      </TermBox>
    </Box>
  );
};

export const CurrentRelationTerm: React.FC<RelationTermProps> = ({ data }) => {
  return (
    <Box
      bgcolor="secondary.main"
      style={{
        border: "1px solid rgba(0, 0, 0, .125)",
        boxShadow: "none",
      }}
    >
      <CurrentTermBox square elevation={0}>
        <Typography variant="h6" color="textSecondary">
          {data.label}
        </Typography>
      </CurrentTermBox>
    </Box>
  );
};
