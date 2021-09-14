import React from "react";
import { LabelItem } from "./SearchLabel";
import { useLabel } from "../api/LabelAPI";
import {
  Box,
  Container,
  Divider,
  Grid,
  Hidden,
  Typography,
} from "@material-ui/core";
import { ReactComponent as VocabularyLogo } from "../assets/vocabulary.svg";

const VocabularyLabel: React.FC<LabelItem> = (props) => {
  const { data, isSuccess } = useLabel(props.iri);

  if (isSuccess) {
    return (
      <Container>
        <Box px={2}>
          <Grid container>
            <Grid item sm={10}>
              <Box
                bgcolor="secondary.main"
                color="textSecondary"
                mt={2}
                px={4}
                py={2}
              >
                <Grid container justifyContent="center" alignItems="center">
                  <Grid item md={2} xs={10}>
                    <Typography variant="h5" color="textSecondary">
                      Slovník
                    </Typography>
                  </Grid>
                  <Grid item md={1} xs={2}>
                    <VocabularyLogo style={{ maxHeight: 35 }} />
                  </Grid>
                  <Hidden only={["xs", "sm"]}>
                    <Grid item md={1}>
                      <Divider
                        orientation="vertical"
                        style={{ height: 60, margin: "auto" }}
                      />
                    </Grid>
                  </Hidden>
                  <Grid item md={8} xs={12}>
                    <Typography variant="h6" color="textSecondary">
                      {data}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    );
  }

  return <></>;
};

export default VocabularyLabel;
