import React from "react";
import { Box, Paper, styled, Typography } from "@mui/material";
import { RelationTermResult } from "../../api/TermAPI";
import RouteLink from "../RouteLink";
import { generateTermRoute } from "../../utils/Utils";

const StyledTerm = styled(Paper, {
  shouldForwardProp: (prop) => prop !== 'current',
})<{ current?: boolean; }>(({ theme, current }) => ({
  backgroundColor: current ? theme.palette.secondary.main : theme.palette.primary.main,
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
//TODO: Relations issue: The components are very similar, maybe try to make it more reusable?
export const RelationTerm: React.FC<RelationTermProps> = ({ data }) => {
  const routeProps = generateTermRoute(data);
  return (
    <Box
      bgcolor="primary.main"
      style={{
        border: "1px solid rgba(0, 0, 0, .125)",
        boxShadow: "none",
      }}
    >
      <StyledTerm current={false} square elevation={0}>
        <RouteLink to={routeProps} variant="h6" color="textSecondary">
          {data.label}
        </RouteLink>
      </StyledTerm>
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
      <StyledTerm current={true} square elevation={0}>
        <Typography variant="h6" color="textSecondary">
          {data.label}
        </Typography>
      </StyledTerm>
    </Box>
  );
};
