import React from "react";
import { ReactComponent as DefinitionIllustration } from "../assets/definition.svg";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useTerm } from "../api/TermAPI";

interface DefinitionProps {
  data: {
    definition?: { cs: string };
    sources: string[];
  };
}

const defaultProps = {
  borderColor: "primary.main",
  m: 1,
  p: 1,
  border: 3,
  width: "50%",
  borderRadius: 16,
};

const useStyles = makeStyles((theme) => ({
  definitionImage: {
    maxHeight: 300,
  },
  wrapper: {
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
  },
}));

const Definition: React.FC<DefinitionProps> = (props) => {
  const classes = useStyles();
  const definition = props.data.definition?.cs;
  const source = props.data.sources !== null ? props.data.sources[0] : "";

  if (!definition) return <></>;

  return (
    <Box className={classes.wrapper}>
      <Box {...defaultProps}>
        <Typography variant="h4">Definice</Typography>
        <Typography variant="body1">{definition}</Typography>
        <Typography variant="body2">{source}</Typography>
      </Box>
      <Box style={{ position: "relative", left: -68 }}>
        <DefinitionIllustration className={classes.definitionImage} />
      </Box>
    </Box>
  );
};
export default Definition;
