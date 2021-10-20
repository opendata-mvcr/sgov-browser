import React from "react";
import { ReactComponent as DefinitionIllustration } from "../assets/definition.svg";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DefinitionWrapper from "./DefinitionWrapper";

interface DefinitionProps {
  data: {
    definition?: { cs: string };
    sources: string[];
    vocabulary: string;
  };
}

const useStyles = makeStyles((theme) => ({
  definitionImage: {
    maxHeight: 260,
  },
}));

const TermDefinition: React.FC<DefinitionProps> = (props) => {
  const classes = useStyles();
  const definition = props.data.definition?.cs;
  const source = props.data.sources !== null ? props.data.sources[0] : "";

  if (!definition && !source) return null;

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
      definition={definition}
      source={source}
    />
  );
};

export default TermDefinition;
