import React from "react";
import { ReactComponent as DefinitionIllustration } from "../assets/definition.svg";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import VocabularyLabel from "./VocabularyLabel";

interface DefinitionProps {
  data: {
    definition?: { cs: string };
    sources: string[];
    vocabulary: string
  };
}

const defaultProps = {
  borderColor: "primary.main",
  px: 3,
  py: 2,
  border: 2,
  borderRadius: 16,
};

const useStyles = makeStyles((theme) => ({
  definitionImage: {
    maxHeight: 300,
  },
  wrapper: {
    margin: theme.spacing(2),
    display: "flex",
    flexDirection: "row",
  },
}));

const Definition: React.FC<DefinitionProps> = (props) => {
  const classes = useStyles();
  const definition = props.data.definition?.cs;
  const source = props.data.sources !== null ? props.data.sources[0] : "";

 // if (!definition) return <></>;

  return (
    <Box className={classes.wrapper}>
      <Box>
        <Box>
          <Box {...defaultProps}>
            <Box mb={2}>
              <Typography variant="h6">Definice</Typography>
            </Box>
            <Box mb={2}>
              <Typography variant="body1">{definition}</Typography>
            </Box>
            {source && (
              <Box fontStyle="italic">
                <Typography variant="body2">- {source}</Typography>
              </Box>
            )}
          </Box>
          <VocabularyLabel iri={props.data.vocabulary}/>
        </Box>
      </Box>
      <Box style={{ position: "relative", left: -60 }}>
        <DefinitionIllustration className={classes.definitionImage} />
      </Box>
    </Box>
  );
};
export default Definition;
