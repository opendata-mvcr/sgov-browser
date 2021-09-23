import React from "react";
import { ReactComponent as DefinitionIllustration } from "../assets/definition.svg";
import { Box, Container, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

interface DefinitionProps {
  data: {
    definition?: { cs: string };
    sources: string[];
    vocabulary: string;
  };
}

const defaultProps = {
  borderColor: "primary.main",
  minHeight: 144,
  px: 3,
  py: 2,
  border: 2,
  borderRadius: 16,
};

const useStyles = makeStyles((theme) => ({
  definitionImage: {
    maxHeight: 260,
  },
  definitionImageWrapper: {
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
}));

const Definition: React.FC<DefinitionProps> = (props) => {
  const classes = useStyles();
  const definition = props.data.definition?.cs;
  const source = props.data.sources !== null ? props.data.sources[0] : "";

  if (!definition) return <></>;

  return (
    <Container>
      <Box px={2} mt={4}>
        <Grid container>
          <Grid item sm={10} xs={12}>
            <Box {...defaultProps}>
              <Box mb={2}>
                <Typography variant="h5">Definice</Typography>
              </Box>
              <Box mb={2}>
                <Typography variant="h6">{definition}</Typography>
              </Box>
              {source && (
                <Box fontStyle="italic" color="text.disabled">
                  <Typography variant="body1">{source}</Typography>
                </Box>
              )}
            </Box>
          </Grid>
          <Grid item sm={2} className={classes.definitionImageWrapper}>
            <Box style={{ position: "relative", height: "100%" }}>
              <Box style={{ position: "absolute", left: -72, bottom: -86 }}>
                <DefinitionIllustration className={classes.definitionImage} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
export default Definition;
