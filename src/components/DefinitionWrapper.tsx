import React, { ReactElement } from "react";
import { Box, BoxProps, Container, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

interface DefinitionWrapperProps {
  definition?: string;
  source?: string;
  illustration: ReactElement;
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
  definitionImageWrapper: {
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
}));

const DefinitionWrapper: React.FC<DefinitionWrapperProps & BoxProps> = (
  props
) => {
  const classes = useStyles();

  return (
    <Container>
      <Box px={2} mt={4}>
        <Grid container>
          <Grid item sm={10} xs={12}>
            <Box
              {...defaultProps}
              display="flex"
              flexDirection="column"
              justifyContent="center"
            >
              <Box mb={props.source ? 2 : 0}>
                <Typography variant="h6">{props.definition}</Typography>
              </Box>
              {props.source && (
                <Box fontStyle="italic" color="text.disabled">
                  <Typography variant="body1">{props.source}</Typography>
                </Box>
              )}
            </Box>
          </Grid>
          <Grid item sm={2} className={classes.definitionImageWrapper}>
            {props.illustration}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default DefinitionWrapper;