import React from "react";
import { Typography } from "@material-ui/core";
import { TermBaseInterface } from "../api/data/terms";

interface AccordionDescriptionProps {
  term: TermBaseInterface;
}

const AccordionDescription: React.FC<AccordionDescriptionProps> = ({
  term,
}) => {
  const description = term.definition ? term.definition : "Pojem nemá definici";

  return <Typography>{description}</Typography>;
};

export default AccordionDescription;
