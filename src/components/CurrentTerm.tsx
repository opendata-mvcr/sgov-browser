import React from "react";
import HierarchyItem from "./HierarchyItem";
import { Box, Paper, Typography, withStyles } from "@material-ui/core";
import { TermAccordionProps } from "./TermAccordion";

const CurrentTermBox = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.secondary.main,
    marginBottom: -1,
    minHeight: 56,
    display: "flex",
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(7),
    alignItems: "center",
    paddingTop: 12,
    paddingBottom: 12,
  },
}))(Paper);

const CurrentTerm: React.FC<TermAccordionProps> = (props) => {
  return (
    <HierarchyItem level={props.level}>
      <Box
        style={{
          border: "1px solid rgba(0, 0, 0, .125)",
          boxShadow: "none",
        }}
      >
        <CurrentTermBox square elevation={0}>
          <Typography variant="h6" color="textSecondary">
            {props.term.label.cs}
          </Typography>
        </CurrentTermBox>
      </Box>
    </HierarchyItem>
  );
};

export default CurrentTerm;
