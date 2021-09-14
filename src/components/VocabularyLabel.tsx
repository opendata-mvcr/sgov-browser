import React from "react";
import { LabelItem } from "./Label";
import { useLabel } from "../api/LabelAPI";
import { Box, Divider, Grid, Typography } from "@material-ui/core";
import { ReactComponent as VocabularyLogo } from "../assets/vocabulary.svg";

const VocabularyLabel: React.FC<LabelItem> = (props) => {
  const { data, isSuccess } = useLabel(props.iri);

  if (isSuccess) {
    return (
      <Box bgcolor="secondary.main" color="textSecondary" mt={2} px={4} py={2}>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item md={2} xs={6}>
            <Typography variant="h6" color="textSecondary">
              Slovník
            </Typography>
          </Grid>
          <Grid item md={2} xs={6}>
            <VocabularyLogo style={{ maxHeight: 40 }} />
          </Grid>
          <Grid item md={8} xs={12}>
            <Typography variant="h6" color="textSecondary">
              {data}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    );
  }

  return <></>;
};

export default VocabularyLabel;
