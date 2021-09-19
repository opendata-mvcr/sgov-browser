import React, { useState } from "react";
import { Box, FormControl, Typography, withStyles } from "@material-ui/core";

import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import RouteLink from "./RouteLink";

import { ReactComponent as Connector } from "../assets/connector_resized.svg";

export interface TermAccordionProps {
  level: number;
}

const Accordion = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {},
}))(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

const ExpandIcon = withStyles((theme) => ({
  root: {
    color: theme.palette.text.secondary,
  },
}))(ExpandMoreIcon);

const TermAccordion: React.FC<TermAccordionProps> = (props) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Box display="flex" ml={props.level * 5} mt={2}>
      <Box style={{ position: "relative", minWidth:"28px" }}>
        <Connector
          style={{
            visibility: props.level !== 0 ? "visible" : "hidden",
            position: "absolute",
            top: "-16px",
          }}
        />
      </Box>
      <Box>
        <Accordion
          square
          expanded={expanded}
          onChange={() => setExpanded(!expanded)}
        >
          <AccordionSummary
            aria-controls="panel1d-content"
            id="panel1d-header"
            expandIcon={<ExpandIcon />}
          >
            <FormControl
              onClick={(event) => event.stopPropagation()}
              onFocus={(event) => event.stopPropagation()}
            >
              <RouteLink to={"/"} variant="h5" color="textSecondary">
                Click to redirect
              </RouteLink>
            </FormControl>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
};

export default TermAccordion;
