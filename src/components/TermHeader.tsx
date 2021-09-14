import React from "react";
import { Box, Container, Grid, Typography } from "@material-ui/core";
import AltLabel from "./AltLabel";
import IRI from "./IRI";

interface DetailHeaderProps {
  data: {
    label: { cs: string };
    altLabels?: { cs?: string }[];
    uri: string
  };
}

const TermHeader: React.FC<DetailHeaderProps> = (props) => {
  const label = props.data.label.cs;
  const altLabels = props.data.altLabels;
  const iri = props.data.uri;

  return (
    <Box bgcolor="primary.main" pb={1}>
      <Container>
        <Box px={5}>
          <Grid container>
            <Grid item md={11} sm={10} xs={9}>
              <Typography variant="h5" color="textSecondary">
                pojem
              </Typography>
              <Typography variant="h1" color="textSecondary">
                {label}
              </Typography>
              <AltLabel altLabels={altLabels} />
            </Grid>
            <Grid item md={1} sm={2} xs={3}>
              <IRI iri={iri}/>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default TermHeader;
