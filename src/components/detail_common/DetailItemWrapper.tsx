import React, { ReactElement } from "react";
import { Box, Container, Typography } from "@mui/material";

interface DetailItemWrapperProps {
  title: string;
  secondaryElement?: ReactElement;
}

export const DetailItemWrapper: React.FC<DetailItemWrapperProps> = (props) => {
  return (
    <Container>
      <Box py={2} mb={2} px={2} mt={4}>
        <Box borderLeft={4} pr={6} borderColor="primary.main">
          <Box display="flex">
            <Box pl={4}>
              <Typography variant="h5">{props.title}</Typography>
            </Box>
            <Box>{props.secondaryElement}</Box>
          </Box>
          <Box pl={4}>{props.children}</Box>
        </Box>
      </Box>
    </Container>
  );
};
