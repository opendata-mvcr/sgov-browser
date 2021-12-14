import React, { ReactElement } from "react";
import {
  Box,
  BoxProps,
  Container,
  Grid,
  styled,
  Typography,
} from "@mui/material";

interface DefinitionWrapperProps {
  definition?: string;
  source?: string;
  illustration: ReactElement;
}

const defaultProps = {
  minHeight: 144,
  px: 3,
  py: 2,
  border: 2,
  borderRadius: "16px",
};

const IllustrationWrapper = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

const DefinitionWrapper: React.FC<DefinitionWrapperProps & BoxProps> = (
  props
) => {
  return (
    <Container>
      <Box px={2} mt={4}>
        <Grid container>
          <Grid item sm={10} xs={12}>
            <Box
              {...defaultProps}
              sx={{ borderColor: "primary.main" }}
              display="flex"
              flexDirection="column"
              justifyContent="center"
            >
              <Box mb={props.source ? 2 : 0}>
                <Typography variant="h6">{props.definition}</Typography>
              </Box>
              {props.source && (
                <Box fontStyle="italic" color="text.disabled">
                  <Typography
                    variant="body1"
                    style={{ wordWrap: "break-word" }}
                  >
                    {props.source}
                  </Typography>
                </Box>
              )}
            </Box>
          </Grid>
          <IllustrationWrapper item sm={2}>
            {props.illustration}
          </IllustrationWrapper>
        </Grid>
      </Box>
    </Container>
  );
};

export default DefinitionWrapper;
