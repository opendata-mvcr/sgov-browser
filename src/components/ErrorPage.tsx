import React from "react";
import { Box, Typography } from "@material-ui/core";
import { ReactComponent as NotFound } from "../assets/404.svg";

const ErrorPage: React.FC = () => {
  return (
    <Box
      flex={1}
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <NotFound style={{ maxHeight: 330, maxWidth: "80%", marginBottom: 30 }} />
      <Box pl={3}>
        <Typography variant="h2">Stránka nebyla nalezena</Typography>
      </Box>
    </Box>
  );
};

export default ErrorPage;
