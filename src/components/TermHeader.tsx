import React from "react";
import { Box, Container, Typography } from "@material-ui/core";

interface DetailHeaderProps {
  data: {
    label: { cs: string };
    altLabels?: { cs: string }[];
  };
}

const TermHeader: React.FC<DetailHeaderProps> = (props) => {
  return (
    <Box bgcolor="primary.main" pb={1}>
      <Container>
        <Box px={5}>
          <Typography variant="h5" color="textSecondary">
            pojem
          </Typography>
          <Typography variant="h1" color="textSecondary">
            {props.data.label.cs}
          </Typography>
          <Typography variant="h5" color="textSecondary">
            {props.data.altLabels?.map((altLabel) => altLabel.cs)}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default TermHeader;
