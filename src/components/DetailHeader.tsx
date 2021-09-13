import React from "react";
import { Box, Container, Typography } from "@material-ui/core";

interface DetailHeaderProps{
  type: string;
  label: string;
}

const DetailHeader: React.FC<DetailHeaderProps> = (props) => {
  return (
    <Box bgcolor="primary.main" pl={9} pb={1}>
      <Container>
        <Typography variant="h5" color="textSecondary">
          {props.type}
        </Typography>
        <Typography variant="h1" color="textSecondary">
          {props.label}
        </Typography>
      </Container>
    </Box>
  );
};

export default DetailHeader;