import React, { ReactElement, useState } from "react";
import { Box, FormControl, withStyles } from "@material-ui/core";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import RouteLink from "./RouteLink";
import { TermInfo } from "./Hierarchy";
import AccordionDescription from "./AccordionDescription";
import HierarchyItem from "./HierarchyItem";
import { generateTermRoute } from "../utils/Utils";
import IriLabel from "./IriLabel";

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

export interface TermAccordionProps {
  level: number;
  term: TermInfo;
  connector?: ReactElement;
  showVocabulary?: boolean;
}

export const TermAccordion: React.FC<TermAccordionProps> = (props) => {
  const [expanded, setExpanded] = useState(false);
  const routeProps = generateTermRoute(props.term);
  return (
    <HierarchyItem level={props.level} connector={props.connector}>
      <Accordion
        square
        expanded={expanded}
        onChange={() => setExpanded(!expanded)}
      >
        <AccordionSummary expandIcon={<ExpandIcon />}>
          <Box>
            {props.showVocabulary && (
              <IriLabel
                iri={props.term.vocabulary}
                variant="body2"
                color="textSecondary"
              />
            )}
            <FormControl
              onClick={(event) => event.stopPropagation()}
              onFocus={(event) => event.stopPropagation()}
            >
              <RouteLink to={routeProps} variant="h6" color="textSecondary">
                {props.term.label.cs}
              </RouteLink>
            </FormControl>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <AccordionDescription
            uri={props.term.uri}
            vocabulary={props.term.vocabulary}
          />
        </AccordionDetails>
      </Accordion>
    </HierarchyItem>
  );
};
