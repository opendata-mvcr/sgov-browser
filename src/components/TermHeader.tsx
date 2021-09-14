import React from "react";
import { Box, Container, Typography } from "@material-ui/core";
import AltLabel from "./AltLabel";

interface DetailHeaderProps {
  data: {
    label: { cs: string };
    altLabels?: { cs?: string }[];
  };
}

const TermHeader: React.FC<DetailHeaderProps> = (props) => {
  const label = props.data.label.cs;
  const altLabels = props.data.altLabels;

  return (
    <Box bgcolor="primary.main" pb={1}>
      <Container>
        <Box px={5}>
          <Typography variant="h5" color="textSecondary">
            pojem
          </Typography>
          <Typography variant="h1" color="textSecondary">
            {label}
          </Typography>
          <AltLabel altLabels={altLabels} />
        </Box>
      </Container>
    </Box>
  );
};

export default TermHeader;
