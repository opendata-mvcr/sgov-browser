import React from "react";
import { ReactComponent as DefinitionIllustration } from "../assets/definition.svg";
import { Box } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import DefinitionWrapper from "./DefinitionWrapper";
import { TermInterface } from "../api/data/terms";

interface DefinitionProps {
  term: TermInterface;
}

const useStyles = makeStyles((theme) => ({
  definitionImage: {
    maxHeight: 260,
  },
}));

const TermDefinition: React.FC<DefinitionProps> = ({ term }) => {
  const classes = useStyles();

  if (!term.definition && !term.source) return null;

  const illustration = (
    <Box style={{ position: "relative", height: "100%" }}>
      <Box left={-72} bottom={-102} style={{ position: "absolute" }}>
        <DefinitionIllustration className={classes.definitionImage} />
      </Box>
    </Box>
  );

  return (
    <DefinitionWrapper
      illustration={illustration}
      definition={term.definition}
      source={term.source}
    />
  );
};

export default TermDefinition;
