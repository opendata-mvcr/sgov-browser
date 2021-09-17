import React, { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  FormControl,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";
import RouteLink from "./RouteLink";
import { ReactComponent as Connector } from "../assets/connector.svg";

const useStyles = makeStyles((theme) => ({
  root: (props: TermAccordionProps) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.secondary,
    //   marginLeft: theme.spacing(props.level * 2),
  }),
  expanded: {
    marginTop: `${theme.spacing(2)}px !important`,
    //  marginBottom: `${theme.spacing(2)}px !important`,
  },
  icon: {
    color: theme.palette.text.secondary,
  },
}));


interface TermAccordionProps {
  level: number;
}

const TermAccordion: React.FC<TermAccordionProps> = (props) => {
  const [expanded, setExpanded] = useState(false);
  const classes = useStyles(props);
  return (
    <Box display="flex" style={{ minHeight: 90 }} ml={props.level * 5}>
      <Box alignSelf="flex-start">
        <Connector
          style={{ visibility: props.level !== 0 ? "visible" : "hidden" }}
        />
      </Box>
      <Box alignSelf="end">
        <Accordion
          classes={classes}
          square
          expanded={expanded}
          onChange={() => setExpanded(!expanded)}
        >
          <AccordionSummary
            aria-controls="panel1d-content"
            id="panel1d-header"
            expandIcon={<ExpandMoreIcon className={classes.icon} />}
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
